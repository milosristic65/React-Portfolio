export const Theme = {
  Dark: "dark",
  Light: "light",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];
