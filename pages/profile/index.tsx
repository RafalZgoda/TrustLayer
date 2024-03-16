import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userDB } from "@/lib/userDb";
import { usePrivy } from "@privy-io/react-auth";
const Home: NextPage = () => {
  const { user } = usePrivy(); // get current account
  const router = useRouter();

  useEffect(() => {
    const address = user?.wallet?.address;
    if (!address) return;

    const twitterAdrr = userDB.find((user) => user.address.toLowerCase() === address.toLowerCase())?.twitter;
    const twitterSmart = userDB.find((user) => user.address.toLowerCase() === address.toLowerCase())?.twitter;
    const twitterId = twitterAdrr || twitterSmart;
    if (twitterId) {
      router.push(`/profile/${twitterId}`);
    }
  }, [user]);
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
