import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { arbitrumSepolia, sepolia } from "viem/chains";
import { Chain } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAddress = (address: string) => {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
};

export const getChainFromId = (chainId: string): Chain => {
  switch (chainId) {
    case "11155111":
      return sepolia;
    case "421614":
      return arbitrumSepolia;
    default:
      return sepolia;
  }
};
