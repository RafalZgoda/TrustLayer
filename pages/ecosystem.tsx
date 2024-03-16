import type { NextPage } from "next";
import Head from "next/head";
import EcosystemScreen from "@/screens/EcosystemScreen";

const Ecosystem: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ecosystem - Trust Layer</title>
        <meta name="description" content="Ecosystem - Trust Layer" />
      </Head>
      <EcosystemScreen />
    </>
  );
};

export default Ecosystem;
