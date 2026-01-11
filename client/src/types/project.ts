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