import type { NextPage } from "next";
import Head from "next/head";
import TokensScreen from "@/screens/TokensScreen";

const Tokens: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tokens - Trust Protocol</title>
        <meta name="description" content="Home - Trust Protocol" />
      </Head>
      <div>
        <TokensScreen />
      </div>
    </>
  );
};

export default Tokens;
