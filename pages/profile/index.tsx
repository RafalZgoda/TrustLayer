import { useAccount } from "wagmi";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const userAccount = useAccount(); // get current account
  const router = useRouter();

  useEffect(() => {
    const { address } = userAccount;
    if (address) {
      router.push(`/profile/${address}`);
    }
  });
  return (
    <>
      <Head>
        <title>Profile - Trust Layer</title>
        <meta name="description" content="Profilz - Trust Layer" />
      </Head>
    </>
  );
};

export default Home;
