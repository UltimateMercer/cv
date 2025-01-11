import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ariaLabel = (
  locale: "pt-br" | "en" | string,
  text: string
): string => {
  return locale === "en" ? `Access ${text}` : `Acessar ${text}`;
};
