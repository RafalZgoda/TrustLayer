import type { NextPage } from "next";
import Head from "next/head";
import ProfileScreen from "@/screens/ProfileScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserOnChainData } from "@/lib/next-id";
import { isAddress } from "viem";
import { useAccount } from "wagmi";

const Profile: NextPage = () => {
  const [identity, setIdentity] = useState("");
  const router = useRouter();
  const userAccount = useAccount(); // get current account
  const [isUserWorlCoinVerified, setIsUserWorlCoinVerified] = useState(false);

  const getUser = async (address: string) => {
    const response = await getUserOnChainData(address);
    const idty = (response.ENS || address) as string;
    setIsUserWorlCoinVerified(true);
    setIdentity(idty);
  };

  useEffect(() => {
    if (router.query.id) {
      if (!isAddress(router.query.id as string)) router.push("/");
      getUser(router.query.id as string);
    }
  });

  return (
    <>
      <Head>
        <title>Profile - Trust Layer</title>
        <meta name="description" content="Profile - Trust Layer" />
      </Head>
      <ProfileScreen
        profileAddress={router.query.id as string}
        userAccount={userAccount}
        identity={identity}
        network={{
          value: "10,984",
          links: 31,
          approved: "2,559",
        }}
        worldCoinVerified={isUserWorlCoinVerified}
      />
    </>
  );
};

export default Profile;
