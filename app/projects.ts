export const projects = [
  {
    id: "haunter",
    name: "Haunter",
    status: "Private beta",
    description:
      "A simple productivity app for organizing notes, tasks, and ideas in one place.",
    href: "https://haunter.app",
    artwork: "/records/haunter-text-free.webp",
    color: "#282a36",
  },
  {
    id: "beignet",
    name: "Beignet",
    status: "Alpha",
    description:
      "A contract-first TypeScript framework for building production-ready web applications.",
    href: "https://beignetjs.com",
    artwork: "/records/beignet-text-free.webp",
    color: "#3c2822",
  },
] as const;

export type Project = (typeof projects)[number];
