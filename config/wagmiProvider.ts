import { createClient } from "viem";
import { arbitrumSepolia, sepolia } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import {
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  rabbyWallet,
  ledgerWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Suggested",
      wallets: [rabbyWallet, metaMaskWallet],
    },
    {
      groupName: "All",
      wallets: [
        injectedWallet,
        rabbyWallet, // => all wallets
        metaMaskWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
        ledgerWallet,
      ],
    },
  ],
  { appName: "RainbowKit App", projectId: "YOUR_PROJECT_ID" },
);

export const config = createConfig({
  connectors,
  chains: [sepolia, arbitrumSepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  ssr: true, // true If your dApp uses server side rendering (SSR)
});

export const INITIAL_CHAIN = sepolia;

export const chainIds = {
  sepolia: sepolia.id,
};
