import Image from "next/image";
import avatar from "./images/avatar.jpg";

const Logo = () => (
  <Image
    alt="Pixel-art illustration of Taylor waving"
    className="size-40 object-contain mix-blend-multiply"
    preload
    sizes="160px"
    src={avatar}
  />
);

export default Logo;
