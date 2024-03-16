import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CircleNetwork: NextPage = () => {
  const network = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      holding: "PSG Fan Token",
      secondTag: "2021-10-10",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
      proximity: "N+1",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      holding: "ApeCoin",
      secondTag: "2021-10-10",
      name: "Stani",
      twitterName: "StaniKulechov",
      proximity: "N+1",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      holding: "Vitality Fan Token",
      secondTag: "2021-10-10",
      name: "Austin Griffith",
      twitterName: "austingriffith",
      proximity: "N+2",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      holding: "PSG Fan Token",
      secondTag: "2021-10-10",
      name: "Stani",
      twitterName: "drakefjustin",
      proximity: "N+3",
    },
  ];

  const [filteredNetwork, setFilteredNetwork] = useState(network);

  const filterProximity = (proximity: string) => {
    setFilteredNetwork(network.filter((person) => person.proximity === proximity));
  };

  const filterHolding = (holding: string) => {
    setFilteredNetwork(network.filter((person) => person.holding === holding));
  };

  return (
    <>
      <Head>
        <title>Circle Network - Chat with your network</title>
        <meta name="description" content="Home - Trust Protocol" />
      </Head>
      <div className="light-gradient w-full h-screen absolute bg-white left-0 top-0">
        <div className="w-full flex p-5 items-center font-bold justify-start gap-3 bg-[#0f232d]">
          <Image width={42} height={42} src="/circle_network.png" alt="user img" />
          <h1 className="text-2xl">Circle Network</h1>
        </div>

        <div>
          <div className="flex">
            <Select
              onValueChange={(holding) => {
                filterHolding(holding);
              }}
            >
              <SelectTrigger className="w-[110px] mx-auto mt-5">
                <SelectValue placeholder="Holding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PSG Fan Token">PSG</SelectItem>
                <SelectItem value="Vitality Fan Token">VIT</SelectItem>
                <SelectItem value="ApeCoin">APE</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(proximity) => {
                filterProximity(proximity);
              }}
            >
              <SelectTrigger className="w-[110px] mx-auto mt-5">
                <SelectValue placeholder="Proximity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="N+1">N+1</SelectItem>
                <SelectItem value="N+2">N+2</SelectItem>
                <SelectItem value="N+3">{"> "} N+3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {filteredNetwork.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer m-2 min-w-20 p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2 text-sm"
              key={index}
            >
              <div className="flex flex-col ">
                <div className="flex justify-evenly mb-4 ">
                  <div className="flex justify-center items-center rounded">
                    <Image width={82} height={82} src={person.photo} alt={person.name} />
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-500 text-xs">@{person.twitterName}</p>
                    <p className="font-bold  text-base mb-2">{person.name}</p>
                    <div className="flex">
                      <div className="bg-white/10 hover:bg-white/20 p-2 cursor-pointer rounded mr-2">
                        <Image width={16} height={16} src="/x_logo.png" alt="x_logo" />
                      </div>
                      <div className="bg-white/10 hover:bg-white/20 p-2 cursor-pointer rounded mr-2">
                        <Image width={16} height={16} src="/lens_protocol.png" alt="lens_logo" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-8/12 mx-auto">
                  <div className="flex flex-col items-start">
                    <p className="text-gray-500 font-light text-[0.75rem]">You both hold</p>
                    <p className="font-bold">
                      {person.holding} {person.holding.includes("Fan Token") && " on Chiliz"}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-gray-500 font-light text-[0.75rem]">Proximity</p>
                    <p className="font-bold">{person.proximity}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CircleNetwork;
