import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../config/wagmiProvider";
import WorldcoinButton from "@/components/WorldCoinButton";
import { PrivyProvider } from "@privy-io/react-auth";
import { sepolia } from "viem/chains";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID!}
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: sepolia,
        loginMethods: ["twitter", "wallet"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {/* <RainbowKitProvider
            initialChain={INITIAL_CHAIN}
            locale="en-US"
            theme={darkTheme({
              accentColor: "#0178FE",
              accentColorForeground: "white",
              fontStack: "system",
              overlayBlur: "small",
            })}
          > */}
          <Layout>
            <WorldcoinButton />
            <Component {...pageProps} />
          </Layout>
          {/* </RainbowKitProvider> */}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default MyApp;
