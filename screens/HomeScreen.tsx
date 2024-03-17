import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getRecommandPeople, TTwitterUser } from "@/lib/twitterApi";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [totalTrustUSD, setTotalTrustUSD] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [trustingYou, setTrustingYou] = useState<TTwitterUser[]>([]);
  const [twitterReco, setTwitterReco] = useState<TTwitterUser[]>([]);
  const [tokensHolders, setTokensHolders] = useState<TTwitterUser[]>([]);
  const [worldCoinVerified, setWorldCoinVerified] = useState<TTwitterUser[]>([]);
  const { authenticated } = usePrivy(); // get current account // get current account

  useEffect(() => {
    const trustAmounts: string[] = trustingYou.map((user) => user.amount);
    //trustAmounts is an array of strings, with space each 3 digits, so we need to remove the spaces and convert to number
    const trustAmountsNumbers = trustAmounts.map((amount) => parseInt(amount.replace(/\s/g, ""), 10));
    const trustAmountsSum = trustAmountsNumbers.reduce((acc, curr) => acc + curr, 0);
    setTotalTrustUSD(trustAmountsSum);
  }, [trustingYou]);

  function search() {
    // search for the user
    if (!searchValue) return;
    router.push(`/profile/${searchValue.toLowerCase()}`);
  }

  useEffect(() => {
    const id = "";
    setTrustingYou(getRecommandPeople(id));
    setTwitterReco(getRecommandPeople(id));
    setTokensHolders(getRecommandPeople(id));
    setWorldCoinVerified(getRecommandPeople(id));
  }, []);

  return (
    <div className="w-full">
      {authenticated ? (
        <>
          <section className="mb-16 flex flex-wrap justify-evenly">
            <div className="  p-10  flex flex-col items-center justify-center rounded-md">
              <p className="text-3xl md:text-4xl mb-8 italic text-center">
                YOUR NETWORK <span className="text-primary-blue">TRUSTS </span> YOU WITH
              </p>
              <p className="font-bold text-primary-blue text-3xl sm:text-5xl">{totalTrustUSD} USD</p>
            </div>
          </section>
          <section className="mb-16 w-full ">
            <div className="flex flex-col items-center w-full ">
              <p className="font-bold text-2xl mb-8">Search and trust someone :</p>
              <form className="flex w-full justify-center">
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
              {trustingYou?.map((person, index) => (
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
                        <p className="text-gray-500 font-light text-[0.75rem]">WITH</p>
                        <p className="   font-bold">{person.amount} $</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 font-light text-[0.75rem]">SINCE</p>
                        <p className=" font-bold">{person.trustDate} days</p>
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
                        <p className="font-bold">{person.amount}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 font-light text-[0.75rem]">LINK</p>
                        <p className=" font-bold">{person.proximity}</p>
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
                        <p className="   font-bold">{person.holding}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-500 font-light text-[0.75rem]">LINK</p>
                        <p className=" font-bold">{person.proximity}</p>
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
                        <p className=" font-bold">{person.proximity}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-3xl mb-8 -mt-36">You need to sign in to access this page</p>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
