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
  },
  {
    id: "proj-002",
    title: "AlgoBot",
    shortDescription: "An AI assistant that solves and analyzes competitive programming problems.",
    description: "AlgoBot integrates with popular competitive programming platforms to fetch problems and provide hints, complexity analysis, and optimal approaches.",
    category: "Artificial Intelligence",
    technologies: ["Python", "FastAPI", "OpenAI API", "Redis", "Docker"],
    contributors: [
      { name: "Alice Lee", role: "AI Engineer", github: "https://github.com/alicelee" }
    ],
    repoLink: "https://github.com/codex-iter/algobot",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false
  },
  {
    id: "proj-003",
    title: "SecureChat",
    shortDescription: "End-to-end encrypted messaging application for secure club communications.",
    description: "Utilizes Signal Protocol for end-to-end encryption in a localized P2P network, ensuring privacy for internal discussions and announcements.",
    category: "Cybersecurity",
    technologies: ["Rust", "WebSockets", "React Native", "PostgreSQL"],
    contributors: [
      { name: "Bob Chen", role: "Security Researcher" },
      { name: "Emma Watson", role: "Backend Developer", github: "https://github.com/emmaw" }
    ],
    repoLink: "https://github.com/codex-iter/securechat",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  },
  {
    id: "proj-004",
    title: "OpenStats",
    shortDescription: "Open-source analytics dashboard for tracking GitHub metrics.",
    description: "A lightweight dashboard that helps open-source maintainers track stars, forks, issues, and PR velocity over time without invasive tracking.",
    category: "Open Source",
    technologies: ["Vue.js", "Nuxt", "GraphQL", "D3.js"],
    contributors: [
      { name: "Charlie Davis", role: "Fullstack", github: "https://github.com/charlied" }
    ],
    demoLink: "https://openstats.example.com",
    repoLink: "https://github.com/codex-iter/openstats",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false
  },
  {
    id: "proj-005",
    title: "Auto-commiter for DSA",
    shortDescription: "Automatically pushes successful code submissions to GitHub.",
    description: "A browser extension that automatically captures successful LeetCode and GeeksForGeeks submissions and pushes them to a connected GitHub repository.",
    category: "Web Development",
    technologies: ["JavaScript", "Chrome Extensions API", "GitHub API"],
    contributors: [
      { name: "David Kim", role: "Creator", github: "https://github.com/davidkim" }
    ],
    repoLink: "https://github.com/codex-iter/auto-commiter",
    images: [
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true
  }
];
