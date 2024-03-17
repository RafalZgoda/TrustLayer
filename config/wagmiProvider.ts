import { createClient, defineChain } from "viem";
import { arbitrumSepolia, baseSepolia, sepolia, arbitrum, celo, base, spicy } from "wagmi/chains";
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

export const myCustomChain = defineChain({
  id: 88882, // Replace this with your chain's ID
  name: "My Custom Chain",
  network: "my-custom-chain",
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: "My Native Currency Name",
    symbol: "My Native Currency Symbol",
  },
  rpcUrls: {
    default: {
      http: ["https://my-custom-chain-https-rpc/"],
      webSocket: ["wss://my-custom-chain-websocket-rpc"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "my-custom-chain-block-explorer" },
  },
});

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
  chains: [sepolia, arbitrum, baseSepolia, spicy, myCustomChain],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  ssr: true, // true If your dApp uses server side rendering (SSR)
});

export const INITIAL_CHAIN = sepolia;

export const chainIds = {
  sepolia: sepolia.id,
  arbitrum: arbitrum.id,
  celo: celo.id,
  base: base.id,
  spicy: spicy.id,
  baseSepolia: baseSepolia.id,
};
