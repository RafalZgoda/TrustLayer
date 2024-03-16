import { Network } from "@/lib/types";
import { Atom, GlobeLock, Receipt } from "lucide-react";
import { UseAccountReturnType } from "wagmi";

const ProfileScreen = (params: {
  profileAddress: string;
  identity: string | string[] | undefined;
  network: Network;
  userAccount: UseAccountReturnType;
}) => {
  const { identity, network } = params;

  // const isLoggedUser = userAccount.address === profileAddress;

  return (
    <div className="w-full flex justify-center mb-16">
      <div className="w-6/12 flex flex-col">
        <h1 className="mb-10 text-3xl font-bold text-center glass p-5">{identity}</h1>

        <div className="flex justify-evenly text-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold ">
              <Atom className="mx-auto mb-3" size={50} />${network.value}
            </h1>
            <p className="text-blue-500">Network Value</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold">
              <GlobeLock className="mx-auto mb-3" size={50} />
              {network.links}
            </h1>
            <p className="text-blue-500">Network Size</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold ">
              <Receipt className="mx-auto mb-3" size={50} />${network.approved}
            </h1>
            <p className="text-blue-500">User&apos;s Approval</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
