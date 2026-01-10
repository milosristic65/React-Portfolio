export interface Experience {
  company: string;
  position: string;
  description: string;
  duration: {
    start: Date;
    end: Date | null;
  };
  logo?: string;
  relatedProjects?: string[];
  companyUrl?: string;
}

export const experiences: Experience[] = [
  {
    company: "Fermicoding Internet Engineering",
    position: "Full Stack Developer",
    description:
      "Working on Drupal 10/11 projects, mainly on an e-commerce project. I build custom modules, configure multilingual features, integrate APIs (including Stripe and PayPal), fix Drupal bugs, and maintain site structures (taxonomies, forms, content types). I also handle Twig/jQuery/SCSS frontend, cron jobs, email logic for when emails are sent, and creating email templates.",
    duration: {
      start: new Date("2025-02-05"),
      end: null,
    },
    relatedProjects: ["Easy Kitchen Lab", "Fermicoding"],
  },
  {
    company: "Luxoft Serbia",
    position: "IT Generalist",
    description:
      "During my time a Luxoft, I gained valuable experience in modern IT practices, including Agile methodologies and the tools commonly used in infrastructure engineering and DevOps environments. These included tools such as Docker, Jenkins, and Kubernetes, along with programming languages like Python and Go.",
    duration: {
      start: new Date("2024-07-28"),
      end: new Date("2025-01-31"),
    },
  },
  {
    company: "Studio Present",
    position: "Backend Developer Intern",
    description:
      "I collaborated with a team of three over the course of a week on PHP development using Drupal, working in an Ubuntu Linux environment. Throughout the project, we received guidance from a mentor.",
    duration: {
      start: new Date("2023-07-24"),
      end: new Date("2023-07-28"),
    },
  },
];
