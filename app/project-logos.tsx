type ProjectLogoProps = {
  className?: string;
};

export function HaunterLogo({ className }: ProjectLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 19.5Q6.7 22 9.3 19.5 12 22 14.7 19.5 17.3 22 20 19.5L20 10C20 5.58 16.42 2 12 2 7.58 2 4 5.58 4 10Z M8.3 10.2a1.1 1.1 0 1 0 2.2 0 1.1 1.1 0 1 0-2.2 0z M13.5 10.2a1.1 1.1 0 1 0 2.2 0 1.1 1.1 0 1 0-2.2 0z"
      />
    </svg>
  );
}

export function BeignetLogo({ className }: ProjectLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 100 100"
    >
      <path
        d="M28 19C40 15 55 16 68 12C81 8 87 16 89 30L94 65C97 81 87 88 74 89L32 93C17 95 10 86 8 72L5 50C3 35 12 24 28 19Z"
        fill="#e6a34b"
      />
      <path
        d="M28 19C40 15 55 16 68 12C81 8 87 16 89 30L90 36C82 44 72 40 58 44C40 49 23 59 5 46C5 33 14 24 28 19Z"
        fill="#fff8e8"
      />
      <path
        d="M28 19C40 15 55 16 68 12C81 8 87 16 89 30L94 65C97 81 87 88 74 89L32 93C17 95 10 86 8 72L5 50C3 35 12 24 28 19Z"
        fill="none"
        stroke="#472a22"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M47 74L47.5 77M72 70L72.5 73M56 77Q60 81 64 76"
        fill="none"
        stroke="#472a22"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
