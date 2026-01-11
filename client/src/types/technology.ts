import { TechCardColor } from "../components/TechCard/types";

export interface Technology {
  name: string;
  value: string;
  icon: string | null;
  color?: TechCardColor;
}