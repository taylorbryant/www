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
      <p className="mb-6">
        Hi, I&apos;m Taylor, a software engineer based in Memphis, TN. I lead
        the web team at{" "}
        <ExternalLink href="https://www.treatmyocd.com/">NOCD</ExternalLink>.
      </p>

      <p className="mb-6">
        Some fun facts about me: I used to run an independent record label
        called{" "}
        <ExternalLink href="https://www.discogs.com/label/390082-Carucage-Records">
          Carucage
        </ExternalLink>
        . I used to play guitar in{" "}
        <ExternalLink href="https://tesstn.bandcamp.com/">Tess</ExternalLink>,{" "}
        <ExternalLink href="https://neevtn.bandcamp.com/">Neev</ExternalLink>,{" "}
        and{" "}
        <ExternalLink href="https://siddharthatn.bandcamp.com/">
          Siddhartha
        </ExternalLink>
        . I used to play drums in a couple of bands:{" "}
        <ExternalLink href="https://closetome.bandcamp.com/">
          Close to Me
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink href="https://stepsistertn.bandcamp.com/">
          Stepsister
        </ExternalLink>
        .
      </p>

      <p>
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
