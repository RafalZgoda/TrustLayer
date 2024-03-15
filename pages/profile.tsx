import type { NextPage } from "next";
import Head from "next/head";
import ProfileScreen from "@/screens/ProfileScreen";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile - Trust Layer</title>
        <meta name="description" content="Profile - Trust Layer" />
      </Head>
      <ProfileScreen />
    </>
  );
};

export default Profile;
