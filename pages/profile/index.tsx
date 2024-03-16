import { useAccount } from "wagmi";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userDB } from "@/lib/userDb";
const Home: NextPage = () => {
  const userAccount = useAccount(); // get current account
  const router = useRouter();

  useEffect(() => {
    const { address } = userAccount;
    if (!address) return;

    const twitterAdrr = userDB.find((user) => user.address.toLowerCase() === address.toLowerCase())?.twitter;
    const twitterSmart = userDB.find((user) => user.address.toLowerCase() === address.toLowerCase())?.twitter;
    const twitterId = twitterAdrr || twitterSmart;
    if (twitterId) {
      router.push(`/profile/${twitterId}`);
    }
  });
  return (
    <>
      <Head>
        <title>Profile - Trust Layer</title>
        <meta name="description" content="Profile - Trust Layer" />
      </Head>
    </>
  );
};

export default Home;
