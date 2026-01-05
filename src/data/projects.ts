import easyKitchenThumb from "../assets/Projects/EasyKitchenLab/EasyKitchenLabThumbnail.webp";
import taglientThumb from "../assets/Projects/TaglientGames/TaglientGamesThumbnail.webp";
import fermicodingThumb from "../assets/Projects/Fermicoding/FermicodingThumbnail.webp";

export interface Project {
  title: string;
  description: string;
  snippet: string;
  thumbnail: string;
  screenshots: string[];
  technologies: string[];
  industries: string[];
  projectUrl: string;
  githubUrl: string | null;
  featured: boolean | false;
}

export const projects: Project[] = [
  {
    title: "Easy Kitchen Lab",
    description:
      "Full-stack e-commerce solution built with React, PHP, and MySQL. Features user authentication, shopping cart, and payment integration.",
    snippet: "E-commerce platform for kitchen appliances.",
    thumbnail: easyKitchenThumb,
    screenshots: [],
    technologies: ["drupal", "php", "jquery", "mysql"],
    industries: ["ecommerce"],
    projectUrl: "https://easykitchenlab.com",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Fermicoding",
    description:
      "Full-stack website for coding tutorials and resources. Built with React, PHP, and MySQL. Features user authentication and content management.",
    snippet: "Official website for Fermicoding.",
    thumbnail: fermicodingThumb,
    screenshots: [],
    technologies: ["drupal", "php", "jquery", "mysql"],
    industries: ["advertising"],
    projectUrl: "https://easykitchenlab.com",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Taglient Games",
    description:
      "Custom CMS built with .NET Core and React. Includes role-based permissions, content scheduling, and SEO optimization.",
    snippet: "Content management system for gaming website.",
    thumbnail: taglientThumb,
    screenshots: [],
    technologies: ["react"],
    industries: ["entertainment"],
    projectUrl: "https://taglientgames.com",
    githubUrl: "https://github.com/milosristic65/TaglientGames",
    featured: true,
  },
];
