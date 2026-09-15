import Image from "next/image";
import beignet from "./images/beignet.jpg";
import haunter from "./images/haunter.jpg";
import tenchi from "./images/tenchi.jpg";

type ProjectLogoProps = {
  className?: string;
};

export function HaunterLogo({ className }: ProjectLogoProps) {
  return <Image alt="" className={className} sizes="64px" src={haunter} />;
}

export function BeignetLogo({ className }: ProjectLogoProps) {
  return <Image alt="" className={className} sizes="64px" src={beignet} />;
}

export function TenchiLogo({ className }: ProjectLogoProps) {
  return <Image alt="" className={className} sizes="64px" src={tenchi} />;
}
