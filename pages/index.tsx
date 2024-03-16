import type { NextPage } from "next";
import Head from "next/head";
import HomeScreen from "@/screens/HomeScreen";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home - Trust Protocol</title>
        <meta name="description" content="Home - Trust Protocol" />
      </Head>
      <div>
        <HomeScreen />
      </div>
    </>
  );
};

export default Home;
