import * as THREE from "three";
import type { Project } from "./projects";

export type RecordScene = {
  select: (index: number) => void;
  hover: (index: number | null) => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
};

const REST_ANGLES = [-0.055, 0.035, -0.035];

/** One shared, on-demand scene; the HTML buttons own all interaction. */
export async function createRecordScene(
  host: HTMLElement,
  projects: readonly Project[],
  onContextLost: () => void,
): Promise<RecordScene> {
  const resources = new Set<{ dispose: () => void }>();
  function keep<T extends { dispose: () => void }>(resource: T): T {
    resources.add(resource);
    return resource;
  }

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute("aria-hidden", "true");

  const loader = new THREE.TextureLoader();
  const loaded = await Promise.allSettled(
    projects.map(async (project) => {
      const texture = keep(await loader.loadAsync(project.artwork));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        8,
      );
      return texture;
    }),
  );
  if (loaded.some((result) => result.status === "rejected")) {
    for (const resource of resources) resource.dispose();
    renderer.dispose();
    throw new Error("Unable to load record artwork");
  }
  const textures = loaded.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 2.5, -2.5, 0.1, 50);
  camera.position.set(0, 0.65, 12);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc6c0b5, 2.4));
  const light = new THREE.DirectionalLight(0xfff5e6, 2.5);
  light.position.set(-3, 7, 6);
  scene.add(light);

  // A radial texture gives the vinyl its fine concentric grooves and sheen.
  const grooveCanvas = document.createElement("canvas");
  grooveCanvas.width = grooveCanvas.height = 1024;
  const groove = grooveCanvas.getContext("2d");
  if (!groove) {
    for (const resource of resources) resource.dispose();
    renderer.dispose();
    throw new Error("Canvas textures are unavailable");
  }
  const sheen = groove.createConicGradient(-0.7, 512, 512);
  for (const [stop, color] of [
    [0, "#101111"],
    [0.13, "#393b3b"],
    [0.25, "#121313"],
    [0.5, "#101111"],
    [0.63, "#333535"],
    [0.75, "#121313"],
    [1, "#101111"],
  ] as const) {
    sheen.addColorStop(stop, color);
  }
  groove.fillStyle = sheen;
  groove.fillRect(0, 0, 1024, 1024);
  for (let radius = 170; radius < 504; radius += 5.2) {
    groove.beginPath();
    groove.arc(512, 512, radius, 0, Math.PI * 2);
    groove.strokeStyle = `rgba(150, 154, 150, ${radius % 7 < 3 ? 0.22 : 0.1})`;
    groove.lineWidth = 1.3;
    groove.stroke();
  }
  const grooves = keep(new THREE.CanvasTexture(grooveCanvas));
  grooves.colorSpace = THREE.SRGBColorSpace;
  grooves.anisotropy = 4;

  const sleeveGeometry = keep(new THREE.BoxGeometry(2.32, 2.32, 0.024));
  const sideGeometry = keep(new THREE.BoxGeometry(0.018, 2.32, 0.078));
  const seamGeometry = keep(new THREE.BoxGeometry(2.32, 0.015, 0.078));
  const discGeometry = keep(new THREE.RingGeometry(0.026, 1.115, 128));
  const rimGeometry = keep(
    new THREE.CylinderGeometry(1.115, 1.115, 0.018, 128, 1, true),
  );
  const labelGeometry = keep(new THREE.RingGeometry(0.026, 0.345, 64));
  const vinylMaterial = keep(
    new THREE.MeshStandardMaterial({
      map: grooves,
      roughness: 0.42,
      metalness: 0.18,
    }),
  );
  const rimMaterial = keep(
    new THREE.MeshStandardMaterial({ color: "#141515", roughness: 0.4 }),
  );
  const paperEdge = keep(
    new THREE.MeshStandardMaterial({ color: "#c5b99c", roughness: 1 }),
  );

  const records = projects.map((project, index) => {
    const group = new THREE.Group();
    const paper = keep(
      new THREE.MeshStandardMaterial({
        map: textures[index],
        roughness: 0.95,
        metalness: 0,
      }),
    );
    const backPaper = keep(
      new THREE.MeshStandardMaterial({ color: project.color, roughness: 1 }),
    );
    const sleeve = new THREE.Mesh(sleeveGeometry, [
      paperEdge,
      paperEdge,
      paperEdge,
      paperEdge,
      paper,
      backPaper,
    ]);
    sleeve.position.z = 0.05;
    const back = new THREE.Mesh(sleeveGeometry, backPaper);
    back.position.z = -0.05;
    const spine = new THREE.Mesh(sideGeometry, backPaper);
    spine.position.x = -1.151;
    const upperSeam = new THREE.Mesh(seamGeometry, paperEdge);
    upperSeam.position.y = 1.152;
    const lowerSeam = new THREE.Mesh(seamGeometry, backPaper);
    lowerSeam.position.y = -1.152;
    group.add(sleeve, back, spine, upperSeam, lowerSeam);

    const disc = new THREE.Group();
    const face = new THREE.Mesh(discGeometry, vinylMaterial);
    face.position.z = 0.009;
    const reverse = new THREE.Mesh(discGeometry, vinylMaterial);
    reverse.rotation.y = Math.PI;
    reverse.position.z = -0.009;
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.x = Math.PI / 2;
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = labelCanvas.height = 512;
    const label = labelCanvas.getContext("2d");
    if (label) {
      label.fillStyle = project.color;
      label.fillRect(0, 0, 512, 512);
      label.strokeStyle = "#d8ceb5";
      label.lineWidth = 2;
      label.beginPath();
      label.arc(256, 256, 224, 0, Math.PI * 2);
      label.stroke();
      label.fillStyle = "#eee4cc";
      label.textAlign = "center";
      label.font = "58px Georgia, serif";
      label.fillText(project.name, 256, 193);
      label.font = "22px monospace";
      label.fillText("SIDE A", 256, 348);
    }
    const labelTexture = keep(new THREE.CanvasTexture(labelCanvas));
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    const labelMesh = new THREE.Mesh(
      labelGeometry,
      keep(new THREE.MeshStandardMaterial({ map: labelTexture, roughness: 1 })),
    );
    labelMesh.position.z = 0.012;
    disc.add(face, reverse, rim, labelMesh);
    group.add(disc);
    scene.add(group);
    return { group, disc };
  });

  let selected = 0;
  let hovered: number | null = null;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let previousTime = 0;
  let narrow = false;
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function update(immediate: boolean, delta = 1 / 60) {
    let moving = false;
    const amount =
      immediate || motionPreference.matches ? 1 : 1 - Math.exp(-delta * 11);
    const approach = (current: number, target: number) => {
      if (Math.abs(target - current) < 0.0005) return target;
      moving = amount < 1;
      return THREE.MathUtils.lerp(current, target, amount);
    };
    for (const [index, record] of records.entries()) {
      const active = index === selected;
      const over = index === hovered;
      const restAngle = REST_ANGLES[index] ?? 0;
      const position =
        ((index - selected + records.length + 1) % records.length) - 1;
      const x = narrow
        ? active
          ? -0.52
          : position * 2.6 - 0.18
        : (index - 1) * 3.15 -
          0.3 +
          (index > selected ? 0.2 : 0) -
          (active && index === 2 ? 0.2 : 0);
      const y = narrow
        ? active
          ? 0.1
          : -0.14
        : active
          ? 0.13
          : over
            ? 0.07
            : -0.01;
      const rotationZ =
        narrow && !active
          ? position * -0.09
          : active
            ? restAngle * 0.35
            : restAngle;
      const scale = approach(record.group.scale.x, narrow && !active ? 0.8 : 1);
      record.group.scale.setScalar(scale);
      record.group.position.x = approach(record.group.position.x, x);
      record.group.position.y = approach(record.group.position.y, y);
      record.group.position.z = approach(
        record.group.position.z,
        active ? 0.38 : narrow ? -0.65 : 0,
      );
      record.group.rotation.y = approach(
        record.group.rotation.y,
        narrow && !active ? position * -0.22 : active || over ? -0.08 : -0.2,
      );
      record.group.rotation.z = approach(record.group.rotation.z, rotationZ);
      record.disc.position.x = approach(
        record.disc.position.x,
        active ? 1.08 : over ? 0.7 : 0.5,
      );
      record.disc.rotation.z = approach(
        record.disc.rotation.z,
        active ? -0.28 : 0.06,
      );
    }
    return moving;
  }

  function render(time: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = Math.min((time - previousTime) / 1000 || 1 / 60, 0.05);
    previousTime = time;
    const moving = update(false, delta);
    renderer.render(scene, camera);
    if (moving) requestRender();
  }

  function requestRender() {
    if (!frame && !disposed && visible && !document.hidden) {
      frame = requestAnimationFrame(render);
    }
  }

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    narrow =
      getComputedStyle(host).getPropertyValue("--record-layout").trim() ===
      "compact";
    const viewWidth = narrow ? Math.max(5.5, (width / height) * 3.5) : 9.9;
    const viewHeight = (height / width) * viewWidth;
    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    update(true);
    requestRender();
  }

  function loseContext(event: Event) {
    event.preventDefault();
    dispose();
    onContextLost();
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", requestRender);
    motionPreference.removeEventListener("change", requestRender);
    renderer.domElement.removeEventListener("webglcontextlost", loseContext);
    for (const resource of resources) resource.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  document.addEventListener("visibilitychange", requestRender);
  motionPreference.addEventListener("change", requestRender);
  renderer.domElement.addEventListener("webglcontextlost", loseContext);
  host.append(renderer.domElement);
  resize();

  return {
    select(index) {
      selected = index;
      requestRender();
    },
    hover(index) {
      hovered = index;
      requestRender();
    },
    setVisible(nextVisible) {
      visible = nextVisible;
      if (visible) requestRender();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    dispose,
  };
}
