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
      viewBox="0 0 24 24"
    >
      <g transform="rotate(-9 12 12)">
        <rect fill="#4f46e5" height="18" rx="6.5" width="18" x="3" y="3" />
        <path
          fill="#c7d2fe"
          d="M3 11 3 9.5 A6.5 6.5 0 0 1 9.5 3 L14.5 3 A6.5 6.5 0 0 1 21 9.5 L21 11 C18.8 12.5 17 10.4 14.9 11.5 13.1 12.5 11.5 10.4 9.5 11.3 7.7 12.2 5 12.4 3 11Z"
        />
      </g>
    </svg>
  );
}

export function TenchiLogo({ className }: ProjectLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 64 64"
    >
      <rect fill="#047857" height="64" rx="18" width="64" />
      <path
        fill="#ecfdf5"
        d="M26 8h9v12h12v9H35v12.5c0 3 1.5 4.5 4.7 4.5H47v9h-8.5C30.2 55 26 50.7 26 42V29h-9v-9h9z"
      />
    </svg>
  );
}
