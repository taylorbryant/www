import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import Logo from "./logo";
const ExternalLink = ({
  href,
  children,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a className="font-medium text-html-blue" href={href} {...rest}>
    {children}
  </a>
);

export default function Home() {
  return (
    <>
      <div className="mb-10">
        <Logo />
      </div>
      <h1 className="text-4xl font-semibold text-balance sm:text-5xl text-gray-900">
        Hi, I&apos;m Taylor.
      </h1>

      <p className="mt-6 text-lg/8 text-gray-800">
        I&apos;m a software engineer with 9+ years of experience based in
        Memphis, TN. I lead the web team at{" "}
        <ExternalLink href="https://www.noto.ai/">Noto</ExternalLink>, where
        we're working to end the mental health crisis with{" "}
        <ExternalLink href="https://www.treatmyocd.com/">NOCD</ExternalLink> and{" "}
        <ExternalLink href="https://hellorebound.com">Rebound</ExternalLink>.
      </p>

      <h2 className="mt-12 text-xl font-semibold text-gray-900">Experience</h2>

      <ul className="mt-4 space-y-4 text-gray-800">
        <li className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline">
          <span className="font-semibold text-gray-900">Noto</span>
          <span
            aria-hidden
            className="hidden h-px flex-1 bg-gray-200 sm:block"
          />
          <span className="text-gray-500">
            Senior Director of Engineering
          </span>
          <span className="tabular-nums text-gray-500">2020 - now</span>
        </li>
        <li className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline">
          <span className="font-semibold text-gray-900">
            Livestock Nutrition Center
          </span>
          <span
            aria-hidden
            className="hidden h-px flex-1 bg-gray-200 sm:block"
          />
          <span className="text-gray-500">Senior Software Engineer</span>
          <span className="tabular-nums text-gray-500">2018 - 2020</span>
        </li>
        <li className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline">
          <span className="font-semibold text-gray-900">HigherVisibility</span>
          <span
            aria-hidden
            className="hidden h-px flex-1 bg-gray-200 sm:block"
          />
          <span className="text-gray-500">Front-End Developer</span>
          <span className="tabular-nums text-gray-500">2017 - 2018</span>
        </li>
      </ul>

      <h2 className="mt-12 text-xl font-semibold text-gray-900">
        Tinkering on
      </h2>

      <ul className="mt-4 space-y-4 text-gray-800">
        <li>
          <ExternalLink href="https://contractkit.dev">
            Contract Kit
          </ExternalLink>{" "}
          - A contract-first TypeScript framework for building type-safe APIs
        </li>
        <li>
          <ExternalLink href="https://www.npmjs.com/package/beignet.css">
            beignet.css
          </ExternalLink>{" "}
          - A tiny, classless stylesheet inspired by Safari Reader Mode
        </li>
      </ul>

      <h2 className="mt-12 text-xl font-semibold text-gray-900">Fun facts</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-800 marker:text-gray-700">
        <li>
          I first started making websites in elementary school, because I wanted
          to create a Dragon Ball Z fansite.
        </li>
        <li>
          In college, I ran an independent record label called{" "}
          <ExternalLink href="https://carucage.com">
            Carucage Records
          </ExternalLink>
          .
        </li>{" "}
        <li>
          I played guitar in{" "}
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
          .
        </li>
        <li>
          {" "}
          I played drums in{" "}
          <ExternalLink href="https://closetome.bandcamp.com/">
            Close to Me
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://stepsistertn.bandcamp.com/">
            Stepsister
          </ExternalLink>
          .
        </li>
      </ul>

      <footer className="mt-12 border-t border-gray-200 pt-6 text-sm/6 text-gray-600">
        <p>
          You can also find me on{" "}
          <ExternalLink href="https://github.com/taylorbryant">
            GitHub
          </ExternalLink>
          , <ExternalLink href="https://x.com/tayl_rbryant">X</ExternalLink>,{" "}
          <ExternalLink href="https://bsky.app/profile/taylor.page">
            Bluesky
          </ExternalLink>
          , and{" "}
          <ExternalLink href="https://linkedin.com/in/taylorjamesbryant">
            LinkedIn
          </ExternalLink>
          .
        </p>
      </footer>
    </>
  );
}
