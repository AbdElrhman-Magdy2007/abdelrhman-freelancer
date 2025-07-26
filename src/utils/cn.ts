import { ClassValue, clsx } from "clsx";
import { twMerge } from "tilwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
