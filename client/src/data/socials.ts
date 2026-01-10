import linkedinIcon from "../assets/Socials/linkedin.svg";
import githubIcon from "../assets/Socials/github.svg";

export interface Socials {
  name: string;
  url: string;
  icon: string | null;
}

export const socials: Socials[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/milos-ristic-a61132242/",
    icon: linkedinIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/milosristic65",
    icon: githubIcon,
  },
];
