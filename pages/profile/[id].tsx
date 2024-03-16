import type { NextPage } from "next";
import Head from "next/head";
import ProfileScreen from "@/screens/ProfileScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userDB } from "@/lib/userDb";
const Profile: NextPage = () => {
  const router = useRouter();
  const [isUserWorlCoinVerified, setIsUserWorlCoinVerified] = useState(false);
  const [address, setAddress] = useState("");
  const [twitter, setTwitter] = useState("");
  const [smartAddress, setSmartAddress] = useState("");

  const getUser = async (twitterUsername: string) => {
    // id can be an address or a username
    // first admit it's a smart address, it would mean we have everything

    const userDataSmart = userDB.find((user) => user.twitter.toLowerCase() === twitterUsername.toLowerCase());
    setTwitter(twitterUsername.toLowerCase());
    if (userDataSmart) {
      setAddress(userDataSmart.address);
      setSmartAddress(userDataSmart.smartAddress);
    }

    setIsUserWorlCoinVerified(true);
  };

  useEffect(() => {
    if (router.query.id) {
      // if (!isAddress(router.query.id as string)) router.push("/");
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
        address={address}
        twitter={twitter}
        smartAddress={smartAddress}
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
