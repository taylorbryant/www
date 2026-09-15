import Image from "next/image";
import avatar from "./images/avatar.jpg";

const Logo = () => (
  <Image
    alt="Pixel-art illustration of Taylor waving"
    className="h-40 w-auto mix-blend-multiply"
    preload
    sizes="110px"
    src={avatar}
  />
);

export default Logo;
