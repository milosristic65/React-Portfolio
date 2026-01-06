export const TechCardColor = {
  CYAN: "cyan",
  BLUE: "blue",
  RED: "red",
  GREEN: "green",
  PURPLE: "purple",
  ORANGE: "orange",
  BLACK: "black",
} as const;

export type TechCardColor = (typeof TechCardColor)[keyof typeof TechCardColor];
