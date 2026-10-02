export const projects = [
  {
    id: "haunter",
    name: "Haunter",
    status: "Private beta",
    description:
      "A simple productivity app for organizing notes, tasks, and ideas in one place.",
    href: "https://haunter.app",
    artwork: "/records/haunter-text-free.webp",
    color: "#272723",
  },
  {
    id: "tenchi",
    name: "Tenchi",
    status: "Alpha",
    description:
      "A small, contract-first Python framework for building typed APIs with async functions.",
    href: "https://tenchi.io",
    artwork: "/records/tenchi-text-free.webp",
    color: "#123d32",
  },
  {
    id: "beignet",
    name: "Beignet",
    status: "Alpha",
    description:
      "A contract-first TypeScript framework for building production-ready web applications.",
    href: "https://beignetjs.com",
    artwork: "/records/beignet-text-free.webp",
    color: "#333b62",
  },
] as const;

export type Project = (typeof projects)[number];
