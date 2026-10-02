"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./project-records.module.css";
import { projects } from "./projects";
import type { RecordScene } from "./record-scene";

export default function ProjectRecords() {
  const [selected, setSelected] = useState(0);
  const [rendered, setRendered] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<RecordScene | null>(null);
  const selectedRef = useRef(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const host = stage.current;
    if (!host) return;

    let cancelled = false;
    let started = false;
    let visible = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        visible = entry.isIntersecting;
        scene.current?.setVisible(visible);
        if (!visible || started) return;
        started = true;

        try {
          const { createRecordScene } = await import("./record-scene");
          if (cancelled) return;
          const nextScene = await createRecordScene(host, projects, () => {
            setRendered(false);
          });
          if (cancelled) {
            nextScene.dispose();
            return;
          }
          scene.current = nextScene;
          nextScene.select(selectedRef.current);
          nextScene.setVisible(visible);
          setRendered(true);
        } catch {
          // The artwork and project controls also work without WebGL.
          if (!cancelled) setRendered(false);
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  function select(index: number) {
    selectedRef.current = index;
    setSelected(index);
    scene.current?.select(index);
  }

  return (
    <section aria-labelledby="projects-heading" className="@container mt-12">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="projects-heading"
          className="text-xl font-semibold text-gray-900"
        >
          Projects
        </h2>
        <p className="text-base text-gray-500 sm:text-sm">Pick a record.</p>
      </div>

      <div className={styles.collection} data-rendered={rendered}>
        <div ref={stage} className={styles.stage} aria-hidden="true">
          <div className={styles.fallback}>
            {projects.map((item, index) => (
              <div
                key={item.id}
                className={styles.flatRecord}
                data-selected={selected === index}
                data-position={
                  ((index - selected + projects.length + 1) % projects.length) -
                  1
                }
              >
                <div className={styles.flatDisc} />
                <Image
                  src={item.artwork}
                  alt=""
                  width={768}
                  height={768}
                  sizes="(max-width: 600px) 65vw, 180px"
                  loading="eager"
                  unoptimized
                  className={styles.flatSleeve}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.selectors}>
          {projects.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              className={styles.selector}
              aria-pressed={selected === index}
              aria-controls="project-details"
              data-position={
                ((index - selected + projects.length + 1) % projects.length) - 1
              }
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                select(index);
              }}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible"))
                  select(index);
                scene.current?.hover(index);
              }}
              onBlur={() => scene.current?.hover(null)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") scene.current?.hover(index);
              }}
              onPointerLeave={() => scene.current?.hover(null)}
              onPointerDown={(event) => {
                suppressClick.current = false;
                if (event.isPrimary && event.button === 0) {
                  touch.current = { x: event.clientX, y: event.clientY };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }
              }}
              onPointerCancel={() => {
                touch.current = null;
              }}
              onPointerUp={(event) => {
                const start = touch.current;
                touch.current = null;
                if (!start) return;
                const dx = event.clientX - start.x;
                const dy = event.clientY - start.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  // Suppress the click that follows a horizontal swipe.
                  suppressClick.current = true;
                  select(
                    (selected + (dx < 0 ? 1 : -1) + projects.length) %
                      projects.length,
                  );
                }
              }}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % projects.length;
                else if (event.key === "ArrowLeft") {
                  next = (index - 1 + projects.length) % projects.length;
                } else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = projects.length - 1;
                else return;
                event.preventDefault();
                select(next);
                buttons.current[next]?.focus();
              }}
            >
              <span className="sr-only">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        id="project-details"
        className={styles.details}
        aria-live="polite"
        aria-atomic="true"
      >
        {projects.map((item, index) => (
          <div
            key={item.id}
            className={styles.detailsPanel}
            data-selected={selected === index}
            aria-hidden={selected !== index}
          >
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold leading-5 text-gray-900">
                  {item.name}
                </h3>
                <span className="inline-flex h-5 items-center rounded-full border border-gray-200 px-1.5 text-[10px] leading-none font-semibold uppercase text-gray-800">
                  {item.status}
                </span>
              </div>
              <a
                className="text-sm font-medium text-html-blue underline-offset-4 hover:underline"
                href={item.href}
                aria-label={`Visit ${item.name}`}
              >
                Visit project <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mt-2 max-w-[56ch] text-base/7 text-pretty text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <noscript>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          {projects.slice(1).map((item) => (
            <li key={item.id}>
              <a className="font-medium text-html-blue" href={item.href}>
                {item.name}
              </a>
              <p className="text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </noscript>
    </section>
  );
}
