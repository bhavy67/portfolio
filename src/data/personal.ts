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
    company: "Anblicks Inc.",
    position: "Software Developer 2",
    location: "Ahmedabad, India",
    duration: "June 2024 - Present",
    type: "Full-time",
    description: "Leading frontend development initiatives and architecting scalable solutions",
    achievements: [
      "Architected and developed a micro-frontend platform serving 100K+ daily active users",
      "Reduced page load time by 60% through code splitting and lazy loading optimization",
      "Mentored 3 junior developers and established code review best practices",
      "Led migration from JavaScript to TypeScript improving code maintainability by 40%",
    ],
    technologies: ["React", "Angular", "Python", "Node.js", "ExtJS", "Docker", "GraphQL"],
  },
  {
    id: 2,
    company: "Weboccult Technologies",
    position: "Software Developer 1",
    location: "Ahmedabad, India",
    duration: "August 2022 - May 2024",
    type: "Full-time",
    description: "Full-stack development focusing on e-commerce solutions",
    achievements: [
      "Built and deployed 15+ RESTful APIs handling 1M+ requests daily",
      "Developed responsive e-commerce platform increasing conversion rate by 35%",
      "Integrated payment gateways (Stripe, PayPal) processing $2M+ monthly transactions",
      "Implemented real-time inventory management system using WebSockets",
      "Optimized database queries reducing response time by 45%",
    ],
    technologies: ["React", "Angular", "Node.js", "Express", "MongoDB", "Redis"],
  },
  {
    id: 3,
    company: "Codeflash Infotech",
    position: "Software Developer Intern",
    location: "Ahmedabad, India",
    duration: "May 2022 - July 2022",
    type: "Internship",
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
    degree: "Post Graduate Degree in Data Science",
    institution: "International Institute of Information Technology",
    location: "Bangalore, India",
    year: "2025 - 2027",
    gpa: "...",
    description: "Focused on Data Science, Machine Learning, and Artificial Intelligence",
    achievements: [
        "Relevant Coursework: Machine Learning, Deep Learning, Big Data Analytics",
    ],
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Computer Science",
    institution: "Gujarat Technological University",
    location: "Ahmedabad, India",
    year: "2019 - 2023",
    gpa: "8.54/10.0",
    description: "Specialized in Software Development and Data Structures",
    achievements: [
        "Relevant Coursework: Data Structures, Algorithms, Database Management",
    ],
  },
];

// Skills Data
export const skills = {
  frontend: [
    { name: "React", level: 95, icon: "SiReact" },
    { name: "Angular", level: 90, icon: "SiAngular" },
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
