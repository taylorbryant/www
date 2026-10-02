import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import ExperienceTapes from "./experience-tapes";
import Logo from "./logo";
import ProjectRecords from "./project-records";

// Brand paths from Simple Icons v13.21.0 (CC0): https://github.com/simple-icons/simple-icons/tree/13.21.0
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/taylorbryant",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "X",
    href: "https://x.com/tayl_rbryant",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/taylor.page",
    path: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/taylorjamesbryant",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

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
      <div className="mb-8">
        <Logo />
      </div>
      <h1 className="text-3xl font-semibold text-balance sm:text-4xl text-gray-900">
        Hi, I&apos;m Taylor.
      </h1>

      <p className="mt-6 text-lg/8 text-gray-800">
        I&apos;m a software engineer with over a decade of experience based in
        Memphis, TN. I lead the web team at{" "}
        <ExternalLink href="https://www.noto.ai/">Noto</ExternalLink>, where
        we're working to end the mental health crisis with{" "}
        <ExternalLink href="https://www.treatmyocd.com/">NOCD</ExternalLink> and{" "}
        <ExternalLink href="https://hellorebound.com">Rebound</ExternalLink>.
      </p>

      <ProjectRecords />

      <ExperienceTapes />

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

      <footer className="mt-12 border-t border-gray-200 pt-6">
        <nav
          aria-label="Social profiles"
          className="-ml-3 flex items-center gap-1"
        >
          {socialLinks.map(({ name, href, path }) => (
            <a
              key={name}
              href={href}
              title={name}
              className="inline-flex size-11 items-center justify-center rounded-full text-gray-600 hover:text-html-blue focus-visible:text-html-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-html-blue"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d={path} />
              </svg>
              <span className="sr-only">{name}</span>
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}
