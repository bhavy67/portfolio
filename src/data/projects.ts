import claudeDashboardImg from '../assets/claude-dashboard.png';
import lifeInWeeksImg from '../assets/life-in-weeks.png';
import kwikToolsImg from '../assets/kwiktools.png';
import klimateImg from '../assets/klimate.png';
import financeTrackerImg from '../assets/financetrackker.png';

// Projects Data
export const projects = [
  {
    id: 1,
    title: "Claude Dashboard",
    category: "Full Stack",
    description: "A local analytics dashboard for Claude Code — track token usage, cost, model distribution, activity heatmaps, and browse session history. All data stays on your machine.",
    image: claudeDashboardImg,
    technologies: ["React", "TypeScript", "Node.js", "Vite"],
    features: [
      "Token usage and cost tracking across all Claude Code sessions",
      "Activity heatmaps and usage pattern analytics",
      "Model distribution and project breakdown charts",
      "Session browsing with search and bookmarks",
      "Budget alerts and CSV export",
      "100% local — nothing leaves your machine",
    ],
    liveUrl: "https://github.com/bhavy67/claude-dashboard",
    githubUrl: "https://github.com/bhavy67/claude-dashboard",
    date: "2026",
    featured: true,
  },
  {
    id: 2,
    title: "Life In Weeks",
    category: "Frontend",
    description: "A minimal life-visualization tool that renders your entire existence as a grid of weeks. Pin memories, define life eras with colors, and download your grid as a phone wallpaper.",
    image: lifeInWeeksImg,
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "PWA"],
    features: [
      "Visualize your life as a grid of weeks, months, or years",
      "Pin memories with titles, descriptions, and emojis to past weeks",
      "Define color-coded life eras and chapters",
      "Statistics dashboard with age, life percentage, and weeks remaining",
      "Download as 1080×1920 phone wallpaper",
      "Progressive Web App — installable and fully offline-capable",
    ],
    liveUrl: "https://gridoflife.vercel.app",
    githubUrl: "https://github.com/bhavy67/Life-In-Weeks",
    date: "2026",
    featured: true,
  },
  {
    id: 3,
    title: "KwikTools - 61 Tools for Developers",
    category: "Full Stack",
    description: "61+ free, privacy-first tools for developers and everyday users — all running 100% in the browser. Covers formatters, finance calculators (GST, SIP, EMI), image utilities, text tools, generators, CSS tools, and more. No server, no tracking, works offline as a PWA.",
    image: kwikToolsImg,
    technologies: ["React 18", "TypeScript", "Vite 7", "Zustand", "Tailwind CSS", "PWA"],
    features: [
      "61 tools across 11 categories: formatters, converters, generators, image tools, security & more",
      "India-specific finance tools: GST, SIP, FD, EMI, fuel cost calculator",
      "Developer tools: JWT decoder, JSON diff, SQL/XML formatter, regex tester, hash generator",
      "Image tools via Canvas API — resize, compress, favicon generator, Base64 converter",
      "CSS generators, minifiers, QR codes, UUID generator, color palette generator",
      "PWA — installable on Android, iOS & desktop with full offline support",
    ],
    liveUrl: "https://kwiktools.vercel.app/",
    githubUrl: "https://github.com/bhavy67/daily-tools",
    date: "2025",
    featured: true,
  },
  {
    id: 4,
    title: "Klimate - Weather App",
    category: "Full Stack",
    description: "A modern weather application built with Next.js providing real-time weather data, interactive forecast charts, and location-based detection with a clean dark/light UI.",
    image: klimateImg,
    technologies: ["Next.js", "TypeScript", "TanStack Query", "Shadcn UI", "Recharts", "Tailwind CSS"],
    features: [
      "Search weather for any location worldwide",
      "Interactive forecast charts powered by Recharts",
      "Lightning-fast data fetching with TanStack Query",
      "Location-based weather detection",
      "Dark and light mode support",
      "Responsive design across all devices",
    ],
    liveUrl: "https://klimate-bhavy.vercel.app/",
    githubUrl: "https://github.com/bhavy67/klimate",
    date: "2024",
    featured: false,
  },
  {
    id: 5,
    title: "Finance Tracker",
    category: "Frontend",
    description: "A personal finance management app to log, categorize, and track income and expenses in real-time — with smart filtering, dark mode, PWA support, and full local data privacy.",
    image: financeTrackerImg,
    technologies: ["HTML", "CSS", "JavaScript", "PWA"],
    features: [
      "Track income and expenses with 12 predefined categories",
      "Real-time balance, income, and expense totals",
      "Filter transactions by category and type",
      "Dark and light mode toggle",
      "Progressive Web App — installable on any device",
      "All data stored locally — complete privacy",
    ],
    liveUrl: "https://bhavy67.github.io/finance-tracker/",
    githubUrl: "https://github.com/bhavy67/finance-tracker",
    date: "2024",
    featured: false,
  },
];

// Project categories for filtering
export const projectCategories = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
];
