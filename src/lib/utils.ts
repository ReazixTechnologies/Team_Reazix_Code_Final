import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Lowercase, hyphenated id fragment — used for ARIA id pairs generated from copy (e.g. tab/panel ids). */
export function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
