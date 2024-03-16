import { Network } from "@/lib/types";
import { Atom, GlobeLock, Receipt } from "lucide-react";
import { UseAccountReturnType } from "wagmi";
import Image from "next/image";

const ProfileScreen = (params: {
  profileAddress: string;
  identity: string;
  network: Network;
  userAccount: UseAccountReturnType;
  worldCoinVerified: boolean;
}) => {
  const { identity, network } = params;

  // const isLoggedUser = userAccount.address === profileAddress;

  return (
    <div className="w-full flex justify-center mb-16">
      <div className="max-w-10/12 flex flex-col">
        <h1 className={`w-fit mb-10 font-bold text-center glass p-5 ${identity?.length > 10 ? "text-md md:text-xl" : "text-3xl"}`}>
          {identity}
        </h1>

        <div className="flex justify-evenly text-center items-start flex-wrap">
          <div className="flex flex-col justify-center items-center  w-32">
            <h1 className="text-xl font-bold ">
              <p className="text-gray-500 font-bold mb-2">NETWORK VALUE</p>
              <Atom className="mx-auto mb-3" size={50} />${network.value}
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center  w-32">
            <h1 className="text-xl font-bold">
              <p className="text-gray-500 font-bold mb-2">NETWORK SIZE</p>
              <GlobeLock className="mx-auto mb-3" size={50} />
              {network.links}
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center  w-32">
            <h1 className="text-xl font-bold ">
              <p className="text-gray-500 font-bold mb-2">USERS&apos;S APPROVALS</p>
              <Receipt className="mx-auto mb-3" size={50} />${network.approved}
            </h1>
          </div>
          {params.worldCoinVerified && (
            <div className="flex flex-col justify-start items-center w-32">
              <h1 className="text-xl font-bold flex flex-col items-center ">
                <p className="text-gray-500 font-bold mb-2">WORLDCOIN VERIFIED</p>
                <Image className="w-16 h-16" src="/worldcoin_verified.png" alt="worldcoin-verified" width={50} height={50} />
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
