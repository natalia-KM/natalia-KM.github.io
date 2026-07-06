/* All copy/data for the site, so the section components stay presentational. */

export const identity = {
  user: "natalia",
  host: "nk-os",
  nameLines: ["NATALIA", "KMIECIK"],
  role: "full-stack software engineer",
  location: "Leicester, UK",
  student: "associate software engineer",
  email: "natalia.km47@gmail.com",
  github: "https://github.com/natalia-KM",
  githubLabel: "github.com/natalia-KM",
  // TODO: replace with your real LinkedIn URL before launch
  linkedin: "https://www.linkedin.com/in/YOUR-LINKEDIN",
  linkedinLabel: "in/natalia-kmiecik",
};

/** Boot lines may contain inline HTML (rendered as-is), matching the export. */
export const bootLines: string[] = [
  "NK-OS 1.0.4 (tty1)",
  "  loading modules ..... react · java · python · sql <span class='ok'>[ok]</span>",
  "  mounting /home/natalia ............... <span class='ok'>[ok]</span>",
  "  starting shell ...................... <b>ready</b>",
  "  last login: just now on tty1",
  "",
];

export const aboutHtml = {
  lead:
    "I build software across the stack, mostly with <b>React</b>, <b>Java</b>, and <b>Python</b>. I'm drawn to the work that's easy to overlook: good tests, reliable deployments, and code that's clear enough that nobody has to ask what it was supposed to do.",
  note: "outside of work, I build small tools and tinker with side projects.",
};

export interface StackGroup {
  title: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  { title: "languages", items: ["TypeScript", "Java", "Python", "C#", "Kotlin", "SQL"] },
  { title: "frontend", items: ["React", "MUI", "Vite", "TanStack Query", "HTML / CSS"] },
  { title: "backend", items: ["Spring / Java", "Node", "REST APIs", "PostgreSQL"] },
  { title: "testing", items: ["Cypress", "JUnit", "Docker", "Fly.io", "Git / CI"] },
];

export interface WorkRow {
  perm: string;
  name: string;
  href?: string;
  badge: "live" | "priv";
  badgeLabel: string;
  domain: string;
}

export const workRows: WorkRow[] = [
  { perm: "drwxr-xr-x", name: "itinerary-hub/", href: "#p-itinerary", badge: "live", badgeLabel: "live", domain: "travel" },
  { perm: "-rw-------", name: "invoicing-platform", badge: "priv", badgeLabel: "private", domain: "fintech" },
  { perm: "-rw-------", name: "market-data-dashboard", badge: "priv", badgeLabel: "private", domain: "data" },
  { perm: "-rw-------", name: "merchant-ops-suite", badge: "priv", badgeLabel: "private", domain: "retail" },
  { perm: "-rwxr-xr-x", name: "should-i-buy-it", href: "#p-sib", badge: "live", badgeLabel: "live", domain: "tool" },
];

export interface ProjectLink {
  label: string;
  href?: string; // omitted => rendered as a "source is private" marker
}

export interface Project {
  id?: string;
  title: string;
  sub: string;
  description: string;
  tech: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "p-itinerary",
    title: "Itinerary Hub",
    sub: "travel · live · solo, full-stack",
    description:
      "A full-stack trip planner with drag-and-drop, day-by-day itineraries and a typed API. Built solo across the whole stack, with an end-to-end test suite and continuous deployment.",
    tech: "react19 · typescript · vite · mui · tanstack-query · dnd-kit  //  java · gradle · docker · fly.io  //  cypress · codecov",
    links: [
      { label: "live demo", href: "https://itinerary-hub-frontend.vercel.app" },
      { label: "frontend", href: "https://github.com/natalia-KM/itinerary-hub-frontend" },
      { label: "service", href: "https://github.com/natalia-KM/itinerary-hub-service" },
    ],
  },
  {
    title: "Invoicing Platform",
    sub: "fintech · commercial · private source",
    description:
      "A web platform for generating and managing invoices, with a React front end talking to a dedicated billing service. Commercial work, so this is a summary of my role rather than a repository.",
    tech: "react · typescript  //  backend service · rest · postgresql",
    links: [{ label: "source is private" }],
  },
  {
    title: "Market Data Dashboard",
    sub: "data · commercial · private source",
    description:
      "A dashboard surfacing live market data, backed by a scheduled agent that collects and normalises feeds. I worked across the interface, the API and the data-collection service.",
    tech: "typescript · react  //  python · scheduled agent · rest apis",
    links: [{ label: "source is private" }],
  },
  {
    title: "Merchant Operations Suite",
    sub: "retail · commercial · private source",
    description:
      "Internal tooling for a merchant business: a front end, a backing service and an automated test suite kept in step as the product grew.",
    tech: "typescript · react  //  service layer  //  automated test suite",
    links: [{ label: "source is private" }],
  },
  {
    id: "p-sib",
    title: "Should I Buy It?",
    sub: "tool · live · early project",
    description:
      "A small, self-contained decision tool: answer a few questions about a potential purchase and it scores whether it's worth the money. An early vanilla-JS project that still earns its keep.",
    tech: "html · css · vanilla javascript",
    links: [{ label: "open the tool", href: "shouldIbuy/index.html" }],
  },
];
