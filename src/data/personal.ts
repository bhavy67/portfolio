import personalConfig from '../config/personal-info.json';
import profileImage from '../assets/Bhavy_Ladani_Profile_Image.jpg';

// Personal Information - Now sourced from central config
export const personalInfo = {
  name: personalConfig.personal.fullName,
  firstName: personalConfig.personal.firstName,
  lastName: personalConfig.personal.lastName,
  initials: personalConfig.personal.initials,
  title: personalConfig.personal.title,
  tagline: personalConfig.personal.tagline,
  location: personalConfig.personal.location.full,
  email: personalConfig.contact.email,
  phone: personalConfig.contact.phone,
  bio: personalConfig.personal.bio,
  yearsOfExperience: personalConfig.personal.yearsOfExperience,
  resumeUrl: personalConfig.assets.resume,
  profileImage: profileImage, // Using imported image from assets
  website: personalConfig.contact.website,
  social: {
    github: personalConfig.social.github.url,
    githubUsername: personalConfig.social.github.username,
    linkedin: personalConfig.social.linkedin.url,
    linkedinUsername: personalConfig.social.linkedin.username,
    leetcode: personalConfig.social.leetcode.url,
    leetcodeUsername: personalConfig.social.leetcode.username,
    twitter: personalConfig.social.twitter.url,
    twitterUsername: personalConfig.social.twitter.username,
    medium: personalConfig.social.medium.url,
    mediumUsername: personalConfig.social.medium.username,
    devto: personalConfig.social.devto.url,
    devtoUsername: personalConfig.social.devto.username,
  },
  meta: {
    title: personalConfig.meta.siteTitle,
    description: personalConfig.meta.siteDescription,
    keywords: personalConfig.meta.keywords,
    ogImage: personalConfig.assets.ogImage,
  },
};

// Experience Data
export const experiences = [
  {
    id: 1,
    company: "Tech Innovators Inc.",
    position: "Senior Software Developer",
    location: "San Francisco, CA",
    duration: "Jan 2024 - Present",
    type: "Full-time",
    description: "Leading frontend development initiatives and architecting scalable solutions",
    achievements: [
      "Architected and developed a micro-frontend platform serving 50K+ daily active users",
      "Reduced page load time by 60% through code splitting and lazy loading optimization",
      "Mentored 5 junior developers and established code review best practices",
      "Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes",
      "Led migration from JavaScript to TypeScript improving code maintainability by 40%",
    ],
    technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL"],
  },
  {
    id: 2,
    company: "Digital Solutions Corp",
    position: "Software Developer",
    location: "Remote",
    duration: "Mar 2022 - Dec 2023",
    type: "Full-time",
    description: "Full-stack development focusing on e-commerce solutions",
    achievements: [
      "Built and deployed 15+ RESTful APIs handling 1M+ requests daily",
      "Developed responsive e-commerce platform increasing conversion rate by 35%",
      "Integrated payment gateways (Stripe, PayPal) processing $2M+ monthly transactions",
      "Implemented real-time inventory management system using WebSockets",
      "Optimized database queries reducing response time by 45%",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redis", "AWS S3"],
  },
  {
    id: 3,
    company: "StartupHub Technologies",
    position: "Junior Software Developer",
    location: "Austin, TX",
    duration: "Jun 2021 - Feb 2022",
    type: "Full-time",
    description: "Developing web applications and learning modern development practices",
    achievements: [
      "Contributed to 20+ features for SaaS platform used by 10K+ businesses",
      "Collaborated with design team to implement pixel-perfect UI components",
      "Fixed 100+ bugs improving application stability and user satisfaction",
      "Participated in agile sprints and daily standups following Scrum methodology",
      "Created comprehensive unit tests achieving 85% code coverage",
    ],
    technologies: ["JavaScript", "React", "Firebase", "Material-UI", "Git"],
  },
];

// Education Data
export const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    year: "2017 - 2021",
    gpa: "3.8/4.0",
    description: "Focused on Software Engineering, Data Structures, and Web Development",
    achievements: [
      "Dean's List all semesters",
      "President of Computer Science Club",
      "Won Best Project Award at University Tech Fest 2020",
    ],
  },
  {
    id: 2,
    degree: "High School Diploma",
    institution: "Lincoln High School",
    location: "Los Angeles, CA",
    year: "2013 - 2017",
    gpa: "3.9/4.0",
    description: "Valedictorian, specializing in STEM subjects",
    achievements: [
      "National Merit Scholar",
      "AP Computer Science - Score: 5",
      "Math Olympiad Regional Champion",
    ],
  },
];

// Skills Data
export const skills = {
  frontend: [
    { name: "React", level: 95, icon: "SiReact" },
    { name: "TypeScript", level: 90, icon: "SiTypescript" },
    { name: "JavaScript", level: 95, icon: "SiJavascript" },
    { name: "Next.js", level: 85, icon: "SiNextdotjs" },
    { name: "Tailwind CSS", level: 90, icon: "SiTailwindcss" },
    { name: "Redux", level: 85, icon: "SiRedux" },
    { name: "HTML5", level: 95, icon: "SiHtml5" },
    { name: "CSS3", level: 95, icon: "SiCss3" },
    { name: "Material-UI", level: 85, icon: "SiMui" },
    { name: "Framer Motion", level: 80, icon: "SiFramer" },
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "SiNodedotjs" },
    { name: "Express", level: 88, icon: "SiExpress" },
    { name: "Python", level: 80, icon: "SiPython" },
    { name: "FastAPI", level: 75, icon: "SiFastapi" },
    { name: "GraphQL", level: 82, icon: "SiGraphql" },
    { name: "REST APIs", level: 92, icon: "SiPostman" },
    { name: "WebSockets", level: 78, icon: "SiSocketdotio" },
  ],
  database: [
    { name: "MongoDB", level: 88, icon: "SiMongodb" },
    { name: "PostgreSQL", level: 85, icon: "SiPostgresql" },
    { name: "MySQL", level: 82, icon: "SiMysql" },
    { name: "Redis", level: 80, icon: "SiRedis" },
    { name: "Firebase", level: 85, icon: "SiFirebase" },
  ],
  tools: [
    { name: "Git", level: 92, icon: "SiGit" },
    { name: "Docker", level: 85, icon: "SiDocker" },
    { name: "AWS", level: 80, icon: "SiAmazon" },
    { name: "Vercel", level: 88, icon: "SiVercel" },
    { name: "Webpack", level: 78, icon: "SiWebpack" },
    { name: "Vite", level: 90, icon: "SiVite" },
    { name: "Jest", level: 85, icon: "SiJest" },
    { name: "CI/CD", level: 82, icon: "SiGithubactions" },
    { name: "Figma", level: 75, icon: "SiFigma" },
  ],
};
