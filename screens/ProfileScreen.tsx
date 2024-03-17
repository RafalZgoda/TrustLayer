import { Crown, UsersRound, Receipt, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twitterUsers, TTwitterUser, getTrustPeople } from "@/lib/twitterApi";
import { getRank, getTrustedByTotalValue, getLastAprover } from "@/lib/trustLayerData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWriteContract, useTransactionReceipt } from "wagmi";
import { TrustLayer as TrustLayerContract } from "../contracts/TrustLayer";
import { type Address } from "viem";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import _ from "lodash";
import { ethers } from "ethers";
import { sendSmartTransaction, smartAccount } from "@/components/ConnectBtn";
const ProfileScreen = () => {
  const router = useRouter();
  const [isUserWorlCoinVerified, setIsUserWorlCoinVerified] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [trustedBy, setTrustedBy] = useState<TTwitterUser[]>([]);
  const [trusting, setTrusting] = useState<TTwitterUser[]>([]);
  const [isMe, setIsMe] = useState(false);
  const { writeContract, isPending, data: txHash } = useWriteContract(); // => to interact with contract & states
  const [contractAddress, setContractAddress] = useState<Address | undefined>(); // => the address to use
  const { authenticated } = usePrivy(); // get current account // get current account
  const { id } = router.query as { id: string };
  const [lastApprover, setLastApprover] = useState<TTwitterUser | undefined>();
  const [isWarningChecked, setIsWarningChecked] = useState(false);
  const [trustedDone, setTrustedDone] = useState(false);
  const { wallets } = useWallets();
  const [myRank, setMyRank] = useState("");
  const [myValue, setMyValue] = useState("");

  const { isSuccess } = useTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (id.toLowerCase() === "0xnicoalz") {
      setIsMe(true);
    }
    setMyRank(getRank(id));
    setMyValue(getTrustedByTotalValue(trustedBy));
  }, [id, trustedBy]);

  const fetchAndSetLastApprover = () => {
    const lastApprover = getLastAprover(id);
    setLastApprover(lastApprover);
  };

  useEffect(() => {
    if (!isSuccess) return;
    fetchAndSetLastApprover();
    setTrustedDone(true);
  }, [isSuccess]);

  useEffect(() => {
    if (!lastApprover) return;
    const newTrustedBy = [lastApprover, ...trustedBy];
    const orderedTrustedBy = _.orderBy(newTrustedBy, ["trustDate"], ["desc"]);
    setTrustedBy(orderedTrustedBy);
  }, [lastApprover]);

  useEffect(() => {
    const { trustedBy, trustingPeople } = getTrustPeople(id);
    setTrustedBy(trustedBy);
    setTrusting(trustingPeople);
  }, [id, setTrustedBy]);

  useEffect(() => {
    const { trustedBy, trustingPeople } = getTrustPeople(id);
    setTrustedBy(trustedBy);
    setTrusting(trustingPeople);
  }, [id, setTrustedBy]);

  useEffect(() => {
    setIsUserWorlCoinVerified(true);
    const user = twitterUsers.find((user) => user.twitterName.toLowerCase() === id.toLowerCase());
    if (user) {
      setImgUrl(user.photo);
    }
  }, [id]);

  useEffect(() => {
    if (!authenticated) return; // if no chainId stop
    const EIPchainId = wallets[0].chainId; // get the chainId
    const chainId = EIPchainId.split(":")[1];
    if (!chainId) return;
    const addressOfChainId = TrustLayerContract.address[Number(chainId)]; // find the address with current chainId
    setContractAddress(addressOfChainId); // set it
  }, [authenticated, wallets]);

  // borrow : params : addresstoken & amount

  const trust = async ({ amountTrust }: { amountTrust: number }) => {
    if (!contractAddress) return; // if no address stop
    if (!id) return; // check params
    const contract = new ethers.Contract(contractAddress, TrustLayerContract.abi as any); // create contract
    const data = contract.interface.encodeFunctionData("setTrustUncreatedAccount", [id, amountTrust]); // encode data
    if (smartAccount) {
      await sendSmartTransaction(contractAddress, BigInt(0), data);
    } else {
      writeContract({
        abi: TrustLayerContract.abi,
        address: contractAddress,
        functionName: "setTrustUncreatedAccount",
        args: [id, amountTrust],
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className=" flex justify-center mb-16">
        <div className="max-w-10/12 flex flex-col">
          <div className="flex relative flex-col md:flex-row items-center justify-center ">
            <div className="md:hidden flex justify-evenly items-center mb-4 w-full">
              <div className="flex justify-center items-center ">
                <Image className="rounded-xl" width={82} height={82} src={imgUrl} alt="user img" />
              </div>
              {isUserWorlCoinVerified && (
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
                <Image className="rounded-xl" width={82} height={82} src={imgUrl} alt="user img" />
              </div>
              <div>
                <h1 className={`w-fit font-bold text-center border border-white/20 p-5 mx-8 text-3xl"}`}>@{id}</h1>
              </div>

              {isUserWorlCoinVerified && (
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
                    {trustedBy.length}
                  </div>
                  <div className="mx-5">
                    <Receipt className="mx-auto mb-3" size={50} />
                    {myValue}$
                  </div>
                </div>
              </h1>
            </div>

            <div className="flex flex-col justify-center items-center ">
              <h1 className="text-xl font-bold">
                <p className="text-gray-500 font-bold mb-4">RANK</p>
                <Crown className="mx-auto mb-3" size={50} />
                TOP {myRank}%
              </h1>
            </div>
          </div>
        </div>
      </div>
      {!isMe && authenticated && (!trustedDone || id != "therealkartik") && (
        <section className="mb-16 flex flex-col items-center justify-center ">
          <h2 className="mb-8 font-bold text-2xl">Do you want to trust him ?</h2>
          <p>
            <input
              onChange={(e) => {
                setIsWarningChecked(e.target.checked);
              }}
              type="checkbox"
              className="mr-2"
            />
            By trusting <span className="text-primary-blue">@{id}</span> you will allow him to borrow your tokens and interract with you on
            all Trust Protocol Dapps
          </p>
          <div className="flex mt-8 justify-center items-center">
            <button
              onClick={() => {
                trust({ amountTrust: 1 });
              }}
              className={`${(isWarningChecked || isPending) && !isSuccess && "bg-violet-500 text-white"}   
              ${isSuccess && "bg-green-500 text-white"}
              ${!isWarningChecked && "bg-gray-700 text-gray-400"}  px-4 py-2 rounded-md mx-4 cursor-pointer`}
            >
              Basic Trust
            </button>
            <button
              onClick={() => {
                trust({ amountTrust: 2 });
              }}
              className={`
              ${(isWarningChecked || isPending) && "bg-primary-blue text-white"}   
              ${!isWarningChecked && "bg-gray-700 text-gray-400"}
              
              px-4 py-2 rounded-md mx-4 cursor-pointer flex justify-center items-center`}
            >
              {!isPending && (!isSuccess || id != "therealkartik") && <p>Absolute Trust</p>}
              {isPending && <Loader className="animate-spin text-white" />}
              {isSuccess && id == "therealkartik" && <p>Success</p>}
            </button>
          </div>
        </section>
      )}
      {!isMe && authenticated && trustedDone && id == "therealkartik" && (
        <section className="mb-16 flex justify-center items-center bg-green-700 w-fit m-auto rounded-lg">
          <div className="mx-4 my-2">YOU ABSOLUTE TRUST HIM</div>
        </section>
      )}
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
                    <Image className="rounded-xl" width={82} height={82} src={person.photo} alt={person.name} />
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
                    <p className="font-bold">{person.amount} $</p>
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
                    <Image className="rounded-xl" width={82} height={82} src={person.photo} alt={person.name} />
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
