import personalConfig from '../config/personal-info.json';
import profileImage from '../assets/Bhavy_Ladani_Profile_Image.jpg';
import resumePdf from '../assets/BhavyLadani_SoftwareDeveloper.pdf';

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
  availability: {
    status: personalConfig.personal.availability.status as 'open' | 'busy' | 'closed',
    label: personalConfig.personal.availability.label,
    responseTime: personalConfig.personal.availability.responseTime,
  },
  resumeUrl: resumePdf, // Using imported PDF from assets
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
    hashnode: personalConfig.social.hashnode.url,
    hashnodeUsername: personalConfig.social.hashnode.username,
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
  // {
  //   id: 1,
  //   degree: "Post Graduate Degree in Data Science",
  //   institution: "International Institute of Information Technology",
  //   location: "Bangalore, India",
  //   year: "2025 - 2027",
  //   gpa: "In Progress",
  //   description: "Focused on Data Science, Machine Learning, and Artificial Intelligence",
  //   achievements: [
  //       "Relevant Coursework: Machine Learning, Deep Learning, Data Analytics",
  //   ],
  // },
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
    { name: "React", icon: "SiReact" },
    { name: "Angular", icon: "SiAngular" },
    { name: "Next.js", icon: "SiNextdotjs" },
    { name: "Redux", icon: "SiRedux" },
    { name: "TypeScript", icon: "SiTypescript" },
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "HTML5", icon: "SiHtml5" },
    { name: "CSS3", icon: "SiCss3" },
    { name: "Tailwind CSS", icon: "SiTailwindcss" },
    { name: "Material-UI", icon: "SiMui" },
    { name: "Framer Motion", icon: "SiFramer" },
  ],
  backend: [
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "Express", icon: "SiExpress" },
    { name: "Python", icon: "SiPython" },
    { name: "FastAPI", icon: "SiFastapi" },
    { name: "GraphQL", icon: "SiGraphql" },
    { name: "REST APIs", icon: "SiPostman" },
    { name: "WebSockets", icon: "SiSocketdotio" },
  ],
  database: [
    { name: "MongoDB", icon: "SiMongodb" },
    { name: "PostgreSQL", icon: "SiPostgresql" },
    { name: "MySQL", icon: "SiMysql" },
    { name: "Redis", icon: "SiRedis" },
    { name: "Firebase", icon: "SiFirebase" },
  ],
  tools: [
    { name: "Git", icon: "SiGit" },
    { name: "Docker", icon: "SiDocker" },
    { name: "AWS", icon: "SiAmazon" },
    { name: "Vercel", icon: "SiVercel" },
    { name: "Webpack", icon: "SiWebpack" },
    { name: "Vite", icon: "SiVite" },
    { name: "Jest", icon: "SiJest" },
    { name: "CI/CD", icon: "SiGithubactions" },
    { name: "Figma", icon: "SiFigma" },
  ],
};
