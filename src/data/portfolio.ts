export const profile = {
  name: "Vinith Kumar",
  title: "Business Analyst",
  tagline: "I turn business needs into clear requirements and working solutions.",
  heroDescription:
    "Business Analyst with 2.5+ years of experience in requirements gathering, product development, testing and stakeholder management. I work closely with clients and teams to build user-focused, scalable solutions.",
  bio: `I'm a Business Analyst who bridges the gap between business goals and
technical execution. I work closely with stakeholders, engineering, and
design to gather requirements, analyze processes, and help teams ship
solutions that actually solve the right problem.`,
  location: "India",
  email: "vinith@zentelai.com",
  photo: "/profile.png",
  resumeUrl: "/resume.pdf",
  resumeDocUrl: "/resume.docx",
  socials: {
    github: "https://github.com/vinithkumar9222-sketch",
    linkedin: "",
    twitter: "",
  },
};

export const stats = [
  { value: "2.5+", label: "Years of Experience" },
  { value: "4+", label: "Projects Delivered" },
  { value: "2+", label: "Clients" },
];

export type Highlight = {
  title: string;
  description: string;
  icon: "document" | "users" | "gear" | "chart";
};

export const highlights: Highlight[] = [
  {
    title: "Requirement Gathering",
    description:
      "Understand business needs and convert them into clear, actionable requirements.",
    icon: "document",
  },
  {
    title: "Stakeholder Management",
    description:
      "Collaborate with clients, product teams and cross-functional stakeholders.",
    icon: "users",
  },
  {
    title: "Testing & QA",
    description:
      "Create test cases, perform manual testing and support quality delivery.",
    icon: "gear",
  },
  {
    title: "Product & Project Management",
    description:
      "Work with Agile (Scrum/Kanban) methodology to ensure timely delivery of solutions.",
    icon: "chart",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    role: "Business Analyst",
    company: "Company Name",
    period: "2024 — Present",
    description:
      "A short description of your responsibilities and impact in this role.",
  },
];

export type Skill = {
  category: string;
  items: string[];
};

export const skills: Skill[] = [
  {
    category: "Business Analysis",
    items: [
      "Requirements Gathering",
      "Process Mapping",
      "User Stories & Acceptance Criteria",
      "Gap Analysis",
      "Stakeholder Management",
    ],
  },
  {
    category: "Process",
    items: ["Agile / Scrum", "Kanban", "Sprint Planning", "UAT"],
  },
  {
    category: "Tools",
    items: ["Jira", "Confluence", "Figma", "Notion", "SQL"],
  },
  {
    category: "Analysis",
    items: ["Data-driven decisions", "Reporting & Dashboards", "User Research"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of this project — the problem it solved, your role, and the outcome or impact.",
    tags: ["Product", "0→1", "B2B SaaS"],
    link: "",
    repo: "",
  },
  {
    title: "Project Two",
    description:
      "A short description of this project — the problem it solved, your role, and the outcome or impact.",
    tags: ["Growth", "Analytics"],
    link: "",
    repo: "",
  },
  {
    title: "Project Three",
    description:
      "A short description of this project — the problem it solved, your role, and the outcome or impact.",
    tags: ["Mobile", "Design"],
    link: "",
    repo: "",
  },
];
