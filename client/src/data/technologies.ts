import phpIcon from "../assets/TechStack/php.svg";
import drupalIcon from "../assets/TechStack/drupal.svg";
import reactIcon from "../assets/TechStack/react.svg";
import nextjsIcon from "../assets/TechStack/nextjs.svg";
import jqueryIcon from "../assets/TechStack/jquery.svg";
import nodejsIcon from "../assets/TechStack/nodejs.svg";
import expressjsIcon from "../assets/TechStack/expressjs.svg";
import dotnetIcon from "../assets/TechStack/dotnet.svg";
import mysqlIcon from "../assets/TechStack/mysql.svg";
import mssqlIcon from "../assets/TechStack/mssql.svg";
import { TechCardColor } from "../components/TechCard/types";

export interface Technology {
  name: string;
  value: string;
  icon: string | null;
  color?: TechCardColor;
}

export const technologies: Technology[] = [
  {
    name: "PHP",
    value: "php",
    icon: phpIcon,
    color: TechCardColor.BLUE,
  },
  {
    name: "Drupal",
    value: "drupal",
    icon: drupalIcon,
    color: TechCardColor.CYAN,
  },
  {
    name: "React",
    value: "react",
    icon: reactIcon,
    color: TechCardColor.CYAN,
  },
  {
    name: "Next.js",
    value: "nextjs",
    icon: nextjsIcon,
    color: TechCardColor.BLACK,
  },
  {
    name: "jQuery",
    value: "jquery",
    icon: jqueryIcon,
    color: TechCardColor.BLUE,
  },
  {
    name: "Node.js",
    value: "nodejs",
    icon: nodejsIcon,
  },
  {
    name: "Express.js",
    value: "expressjs",
    icon: expressjsIcon,
  },
  {
    name: ".NET",
    value: "dotnet",
    icon: dotnetIcon,
    color: TechCardColor.PURPLE,
  },
  {
    name: "MySQL",
    value: "mysql",
    icon: mysqlIcon,
  },
  {
    name: "Microsoft SQL Server",
    value: "mssql",
    icon: mssqlIcon,
  },
];
