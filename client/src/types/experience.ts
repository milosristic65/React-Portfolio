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