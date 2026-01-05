function getScreenshots(images: Record<string, unknown>) {
  return Object.entries(images)
    .filter(([key]) => key.includes("screenshot"))
    .map(([, mod]) => (mod as { default: string }).default);
}

function getThumbnail(images: Record<string, unknown>): string | undefined {
  return (
    Object.entries(images).find(([key]) => key.includes("thumbnail"))?.[1] as {
      default: string;
    }
  )?.default;
}

// Easy Kitchen Lab
const easyKitchenLabImages = import.meta.glob(
  "../assets/Projects/EasyKitchenLab/*.webp",
  { eager: true }
);
const easyKitchenThumbnail = getThumbnail(easyKitchenLabImages) ?? "";
const easyKitchenLabScreenshots = getScreenshots(easyKitchenLabImages);

// Taglient Games
const taglientGamesImages = import.meta.glob(
  "../assets/Projects/TaglientGames/*.webp",
  { eager: true }
);
const taglientGamesThumbnail = getThumbnail(taglientGamesImages) ?? "";
const taglientGamesScreenshots = getScreenshots(taglientGamesImages);

// Fermicoding
const fermicodingImages = import.meta.glob(
  "../assets/Projects/Fermicoding/*.webp",
  { eager: true }
);
const fermicodingThumbnail = getThumbnail(fermicodingImages) ?? "";
const fermicodingScreenshots = getScreenshots(fermicodingImages);

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
    thumbnail: easyKitchenThumbnail,
    screenshots: easyKitchenLabScreenshots,
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
    thumbnail: fermicodingThumbnail,
    screenshots: fermicodingScreenshots,
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
    thumbnail: taglientGamesThumbnail,
    screenshots: taglientGamesScreenshots,
    technologies: ["react"],
    industries: ["entertainment"],
    projectUrl: "https://taglientgames.com",
    githubUrl: "https://github.com/milosristic65/TaglientGames",
    featured: true,
  },
];
