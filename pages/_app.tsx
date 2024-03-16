import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config, INITIAL_CHAIN } from "../config/wagmiProvider";
import WorldcoinButton from "@/components/WorldCoinButton";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={INITIAL_CHAIN}
          locale="en-US"
          theme={darkTheme({
            accentColor: "#0178FE",
            accentColorForeground: "white",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <Layout>
            <WorldcoinButton />
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
