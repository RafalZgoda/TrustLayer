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
    console.log({ address });
    if (!address) return;
    const twitterAdrr = userDB.find((user) => user.address.toLowerCase() === address.toLowerCase())?.twitter;
    const twitterPrivy = userDB.find((user) => user.privyAddress.toLowerCase() === address.toLowerCase())?.twitter;
    const twitterId = twitterAdrr || twitterPrivy;
    console.log({ twitterId, twitterPrivy });
    if (twitterId) {
      router.push(`/profile/${twitterId}`);
    }
  }, [router, user]);
  return (
    <>
      <Head>
        <title>Profile - Trust Protocol</title>
        <meta name="description" content="Profile - Trust Protocol" />
      </Head>
    </>
  );
};

export default Home;
