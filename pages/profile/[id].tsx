import type { NextPage } from "next";
import Head from "next/head";
import ProfileScreen from "@/screens/ProfileScreen";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile - Trust Protocol</title>
        <meta name="description" content="Profile - Trust Protocol" />
      </Head>
      <ProfileScreen />
    </>
  );
};

export default Profile;
