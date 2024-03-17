import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [totalTrustUSD, setTotalTrustUSD] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const total = 10984;
    setTotalTrustUSD(total);
  }, []);

  function search() {
    // search for the user
    if (!searchValue) return;
    router.push(`/profile/${searchValue.toLowerCase()}`);
  }

  const trustingYou = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      firstTag: 100,
      secondTag: "2021-10-10",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      firstTag: 100,
      secondTag: "2021-10-10",
      name: "Stani",
      twitterName: "StaniKulechov",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      firstTag: 100,
      secondTag: "2021-10-10",
      name: "Austin Griffith",
      twitterName: "austingriffith",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      firstTag: 100,
      secondTag: "2021-10-10",
      name: "Stani",
      twitterName: "drakefjustin",
    },
  ];

  const twitterReco = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      firstTag: 100,
      secondTag: "N+1",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      firstTag: 100,
      secondTag: "N+1",
      name: "Stani",
      twitterName: "StaniKulechov",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      firstTag: 100,
      secondTag: "N+2",
      name: "Austin Griffith",
      twitterName: "austingriffith",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      firstTag: 100,
      secondTag: "N+2",
      name: "Stani",
      twitterName: "drakefjustin",
    },
  ];

  const tokensHolders = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      firstTag: "PSG",
      secondTag: "N+1",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      firstTag: "APE",
      secondTag: "N+1",
      name: "Stani",
      twitterName: "StaniKulechov",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      firstTag: "NOUNS",
      secondTag: "N+2",
      name: "Austin Griffith",
      twitterName: "austingriffith",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      firstTag: "CHZ",
      secondTag: "N+3",
      name: "Stani",
      twitterName: "drakefjustin",
    },
  ];

  const worldCoinVerified = [
    {
      photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
      firstTag: 100,
      secondTag: "N+1",
      name: "Kartik Talwar",
      twitterName: "TheRealKartik",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
      firstTag: 100,
      secondTag: "N+1",
      name: "Stani",
      twitterName: "StaniKulechov",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
      firstTag: 100,
      secondTag: "N+2",
      name: "Austin Griffith",
      twitterName: "austingriffith",
    },
    {
      photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
      firstTag: 100,
      secondTag: "N+3",
      name: "Stani",
      twitterName: "drakefjustin",
    },
  ];

  return (
    <div className="w-full">
      <section className="mb-16 flex flex-wrap justify-evenly">
        <div className="  p-10  flex flex-col items-center justify-center rounded-md">
          <p className="text-4xl mb-8 italic">
            YOUR NETWORK <span className="text-primary-blue">TRUSTS </span> YOU WITH
          </p>
          <p className="font-bold text-primary-blue text-5xl">{totalTrustUSD} USD</p>
        </div>
      </section>
      <section className="mb-16 w-full ">
        <div className="flex flex-col items-center w-full ">
          <p className="font-bold text-2xl mb-8">Search and trust someone :</p>
          <form className="flex w-full">
            <input
              placeholder="X handle, address, ENS, Farcaster, Lens..."
              className="border border-white/20 rounded-md p-2 bg-bg-dark-blue focus:outline-none w-96 mr-4"
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              className="bg-primary-blue text-white px-4 py-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                search();
              }}
            >
              Search
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <div className="mx-4">
              <Image width={50} height={100} src="/x.png" alt="x_logo" />
            </div>
            <div className="mx-4">
              <Image width={100} height={100} src="/ens.png" alt="lens_logo" />
            </div>
            <div className="mx-4">
              <Image width={100} height={100} src="/farcaster.png" alt="lens_logo" />
            </div>
            <div className="mx-4">
              <Image width={100} height={100} src="/lens_protocol_long.png" alt="lens_logo" />
            </div>
          </div>
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="mb-8 font-bold text-2xl flex  items-center">
          They're trusting you <span className="text-sm font-thin ml-2">(and you don't yet !)</span>
        </h2>
        <div className="flex overflow-auto">
          {trustingYou.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer m-2 min-w-96 border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2"
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
                    <p className="   font-bold">{person.firstTag} $</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-light text-[0.75rem]">SINCE</p>
                    <p className=" font-bold">{person.secondTag}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="mb-8 font-bold text-2xl">Based on your Twitter follows:</h2>
        <div className="flex overflow-auto">
          {twitterReco.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer m-2 min-w-96 border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2"
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
                    <p className="text-gray-500 font-light text-[0.75rem]">FOLLOWERS</p>
                    <p className="font-bold">{person.firstTag}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-light text-[0.75rem]">LINK</p>
                    <p className=" font-bold">{person.secondTag}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="mb-8 font-bold text-2xl">You're both holding it:</h2>
        <div className="flex overflow-auto">
          {tokensHolders.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer m-2 min-w-96 border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2"
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
                    <p className="text-gray-500 font-light text-[0.75rem]">TOKEN</p>
                    <p className="   font-bold">{person.firstTag}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-light text-[0.75rem]">LINK</p>
                    <p className=" font-bold">{person.secondTag}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="mb-8 font-bold text-2xl">Worlcoin verified:</h2>
        <div className="flex overflow-auto">
          {worldCoinVerified.map((person, index) => (
            <Link
              href={`/profile/${person.twitterName.toLowerCase()}`}
              className="cursor-pointer m-2 min-w-96 border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2"
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
                  <div className="flex flex-col items-center justify-center mr-8">
                    <Image className="w-12 h-12" src="/worldcoin_verified.png" alt="worldcoin-verified" width={50} height={50} />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 font-light text-[0.75rem]">LINK</p>
                    <p className=" font-bold">{person.secondTag}</p>
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

export default HomeScreen;
