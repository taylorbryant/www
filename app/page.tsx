import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

const ExternalLink = ({
  href,
  children,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a className="text-[#0000EE]" href={href} {...rest}>
    {children}
  </a>
);

export default function Home() {
  return (
    <>
      <p className="mb-6 text-pretty">
        Hi, I&apos;m Taylor, a software engineer based in Memphis, TN. I lead
        the web team at{" "}
        <ExternalLink href="https://www.treatmyocd.com/">NOCD</ExternalLink>, where we&apos;re helping people with OCD by raising awareness and providing effective treatment.
      </p>

      <p className="mb-6 text-pretty">
        Some fun facts about me: I first started making websites in elementary
        school, because I wanted to create a Dragon Ball Z fansite. In college,
        I ran an independent record label called{" "}
        <ExternalLink href="https://www.discogs.com/label/390082-Carucage-Records">
          Carucage Records
        </ExternalLink>
        . I played guitar in{" "}
        <ExternalLink href="https://tesstn.bandcamp.com/">Tess</ExternalLink>,{" "}
        <ExternalLink href="https://neevtn.bandcamp.com/">Neev</ExternalLink>,{" "}
        <ExternalLink href="https://sequoiaisrad.bandcamp.com/album/frank">
          Sequoia
        </ExternalLink>
        ,{" "}
        <ExternalLink href="https://greyscaletn.bandcamp.com/album/greyscale-coma-regalia-split-7">
          Greyscale
        </ExternalLink>
        , and{" "}
        <ExternalLink href="https://siddharthatn.bandcamp.com/">
          Siddhartha
        </ExternalLink>
        . I played drums in{" "}
        <ExternalLink href="https://closetome.bandcamp.com/">
          Close to Me
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink href="https://stepsistertn.bandcamp.com/">
          Stepsister
        </ExternalLink>
        .
      </p>

      <p className="text-pretty">
        You can also find me on{" "}
        <ExternalLink href="https://github.com/taylorbryant">
          GitHub
        </ExternalLink>
        , <ExternalLink href="https://x.com/tayl_rbryant">X</ExternalLink>, and{" "}
        <ExternalLink href="https://linkedin.com/in/taylorjamesbryant">
          LinkedIn
        </ExternalLink>
        .
      </p>
    </>
  );
}
