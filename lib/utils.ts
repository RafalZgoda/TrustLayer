import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAddress = (address: string) => {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
};
