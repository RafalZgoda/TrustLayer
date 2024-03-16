import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { sepolia } from "viem/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAddress = (address: string) => {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
};

export const getChainFromId = (chainId: string) => {
  console.log(chainId);
  switch (chainId) {
    case "11155111":
      return sepolia;
  }
};
