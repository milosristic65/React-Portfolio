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
  snippet: string;
  challenge: string;
  solution: string;
  thumbnail: string;
  screenshots: string[];
  technologies: string[];
  industries: string[];
  projectUrl: string | null;
  githubUrl: string | null;
  featured: boolean | false;
}

export const projects: Project[] = [
  {
    title: "Easy Kitchen Lab",
    snippet: "E-commerce platform for kitchen appliances.",
    challenge:
      "Full-stack e-commerce solution. Features user authentication, shopping cart, and payment integration.",
    solution: "Placeholder solution.",
    thumbnail: easyKitchenThumbnail,
    screenshots: easyKitchenLabScreenshots,
    technologies: ["drupal", "php", "jquery", "mysql"],
    industries: ["ecommerce"],
    projectUrl: "https://www.easykitchenlab.com",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Fermicoding",
    snippet: "Fermicoding official website.",
    challenge: "Full-stack website for coding tutorials and resources.",
    solution: "Placeholder solution.",
    thumbnail: fermicodingThumbnail,
    screenshots: fermicodingScreenshots,
    technologies: ["drupal", "php", "jquery", "mysql"],
    industries: ["advertising"],
    projectUrl: "https://www.fermicoding.com",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Taglient Games",
    snippet: "Taglient Games official website.",
    challenge:
      "Official website for Taglient Games, featuring game listings and company information.",
    solution: "Placeholder solution.",
    thumbnail: taglientGamesThumbnail,
    screenshots: taglientGamesScreenshots,
    technologies: ["react", "nodejs", "expressjs"],
    industries: ["entertainment"],
    projectUrl: "https://taglientgames.com",
    githubUrl: "https://github.com/milosristic65/TaglientGames",
    featured: true,
  },
];
