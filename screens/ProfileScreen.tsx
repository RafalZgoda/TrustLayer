import { Network } from "@/lib/types";
import { Crown, UsersRound, Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileScreen = (params: {
  address: string;
  twitter: string;
  smartAddress: string;
  network: Network;
  worldCoinVerified: boolean;
}) => {
  const { twitter, network } = params;

  const trustedBy = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Stani",
      twitterName: "StaniKulechov",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Austin Griffith",
      twitterName: "austingriffith",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Stani",
      twitterName: "drakefjustin",
    },
  ];

  const trusting = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Stani",
      twitterName: "StaniKulechov",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Austin Griffith",
      twitterName: "austingriffith",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      amount: 100,
      trustDate: "2021-10-10",
      name: "Stani",
      twitterName: "drakefjustin",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className=" flex justify-center mb-16">
        <div className="max-w-10/12 flex flex-col">
          <div className="flex relative flex-col md:flex-row items-center justify-center ">
            <div className="md:hidden flex justify-evenly items-center mb-4 w-full">
              <div className="flex justify-center items-center rounded">
                <Image
                  width={82}
                  height={82}
                  src="https://pbs.twimg.com/profile_images/1625144132942561282/iduIzbk__400x400.jpg"
                  alt="user img"
                />
              </div>
              {params.worldCoinVerified && (
                <div className="md:hidden flex flex-col justify-start items-center w-32 mb-4">
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-bold text-[0.5rem]">WORLDCOIN VERIFIED</p>
                    <Image className="w-12 h-12" src="/worldcoin_verified.png" alt="worldcoin-verified" width={50} height={50} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-start  mb-10">
              <div className="hidden md:flex justify-center items-center rounded ">
                <Image
                  width={82}
                  height={82}
                  src="https://pbs.twimg.com/profile_images/1625144132942561282/iduIzbk__400x400.jpg"
                  alt="user img"
                />
              </div>
              <div>
                <h1 className={`w-fit font-bold text-center border border-white/20 p-5 mx-8 text-3xl"}`}>@{twitter}</h1>
              </div>

              {params.worldCoinVerified && (
                <div className="hidden md:flex flex-col items-center">
                  <p className="text-gray-500 font-bold text-[0.5rem]">WORLDCOIN VERIFIED</p>
                  <Image className="w-12 h-12" src="/worldcoin_verified.png" alt="worldcoin-verified" width={50} height={50} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-evenly text-center items-start flex-wrap ">
            <div className="flex flex-col justify-center items-center ">
              <h1 className="text-xl font-bold">
                <p className="text-gray-500 font-bold mb-4">TRUSTED BY</p>
                <div className="flex justify-center items-center">
                  <div className="mx-5">
                    <UsersRound className="mx-auto mb-3" size={50} />
                    {network.links}
                  </div>
                  <div className="mx-5">
                    <Receipt className="mx-auto mb-3" size={50} />${network.approved}
                  </div>
                </div>
              </h1>
            </div>

            <div className="flex flex-col justify-center items-center ">
              <h1 className="text-xl font-bold">
                <p className="text-gray-500 font-bold mb-4">RANK</p>
                <Crown className="mx-auto mb-3" size={50} />
                TOP 2%
              </h1>
            </div>
          </div>
        </div>
      </div>
      <section className="mb-16 ">
        <h2 className="mb-8 font-bold text-2xl">Trusted by:</h2>
        <div className="flex flex-wrap justify-center lg:justify-evenly xl:justify-between">
          {trustedBy.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer my-2 min-w-96 border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2"
              key={index}
            >
              <div className="flex flex-col ">
                <div className="flex justify-evenly mb-4 ">
                  <div className="flex justify-center items-center rounded">
                    <Image width={82} height={82} src={person.photo} alt={person.name} />
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-500 text-sm">@{person.twitterName}</p>
                    <p className="font-bold  text-xl mb-2">{person.name}</p>
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
                <div className="flex justify-evenly items-center ">
                  <div className="flex flex-col items-center mr-8">
                    <p className="text-gray-500 font-light text-[0.75rem]">STAKED</p>
                    <p className="   font-bold">{person.amount} $</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-light text-[0.75rem]">SINCE</p>
                    <p className=" font-bold">{person.trustDate}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="mb-8 font-bold text-2xl">Trusting:</h2>
        <div className="flex flex-wrap justify-center lg:justify-evenly xl:justify-between">
          {trusting.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer my-2 min-w-96 border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2"
              key={index}
            >
              <div className="flex flex-col ">
                <div className="flex justify-evenly mb-4 ">
                  <div className="flex justify-center items-center rounded">
                    <Image width={82} height={82} src={person.photo} alt={person.name} />
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-500 text-sm">@{person.twitterName}</p>
                    <p className="font-bold  text-xl mb-2">{person.name}</p>
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
                <div className="flex justify-evenly items-center ">
                  <div className="flex flex-col items-center mr-8">
                    <p className="text-gray-500 font-light text-[0.75rem]">STAKED</p>
                    <p className="   font-bold">{person.amount} $</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-light text-[0.75rem]">SINCE</p>
                    <p className=" font-bold">{person.trustDate}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
