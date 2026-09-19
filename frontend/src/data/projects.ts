export type ProjectContributor = {
  name: string;
  role?: string;
  github?: string;
  linkedin?: string;
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: "Web Development" | "Artificial Intelligence" | "Machine Learning" | "Competitive Programming" | "Open Source" | "Cybersecurity" | "Other";
  technologies: string[];
  contributors: ProjectContributor[];
  demoLink?: string;
  repoLink?: string;
  images?: string[];
  featured?: boolean;
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-001",
    title: "CODEX Main Website",
    shortDescription: "The official web portal for the CODEX technical club.",
    description: "A comprehensive platform built for members of CODEX, providing orientation materials, blogs, event listings, and a showcase of internal excellence.",
    category: "Web Development",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Sanity"],
    contributors: [
      { name: "John Doe", role: "Frontend Lead", github: "https://github.com/johndoe" },
      { name: "Jane Smith", role: "UI/UX Designer", linkedin: "https://linkedin.com/in/janesmith" }
    ],
    demoLink: "https://codex-iter.in",
    repoLink: "https://github.com/codex-iter/codex-main",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  }
];
