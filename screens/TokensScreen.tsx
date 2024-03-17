import { useState, useEffect } from "react";
import Image from "next/image";
import _ from "lodash";
import { TToken } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchUsersTokens, fetchBorrowableTokens } from "@/lib/tokensDataFetcher";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useWriteContract, useTransactionReceipt } from "wagmi";
import { type Address } from "viem";
import { TrustLayer as TrustLayerContract } from "../contracts/TrustLayer";
import { ethers } from "ethers";
import { USDC } from "@/contracts/Tokens";
const HomeScreen: React.FC = () => {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [approvedTokens, setApprovedTokens] = useState<TToken[]>([]);
  const [walletTokens, setWalletTokens] = useState<TToken[]>([]);
  const [totalBorrawableUSD, setTotalBorrawableUSD] = useState<number>(0);
  const [borrowableTokens, setBorrowableTokens] = useState<TToken[]>([]);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [usersTokens, setUsersTokens] = useState<TToken[]>([]);
  const { writeContract, isPending, data: txHash } = useWriteContract(); // => to interact with contract & states
  const [trustLayerContractAddress, setTrustLayerContractAddress] = useState<Address | undefined>(); // => the address to use

  const searchParams = useSearchParams();
  const twitter = searchParams.get("twitter");
  const jwt = searchParams.get("jwt");
  const { isSuccess } = useTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    updateTokens();
  }, [usersTokens]);

  useEffect(() => {
    const address = wallets[0]?.address;
    if (!address || !authenticated || !wallets) {
      setUsersTokens([]);
      return;
    }
    console.log("address", address);
    const fetchedTokens = fetchUsersTokens(address);
    setUsersTokens(fetchedTokens);
    setBorrowableTokens(fetchBorrowableTokens(address));
  }, [authenticated, wallets]);

  useEffect(() => {
    const total = 10984;
    setTotalBorrawableUSD(total / 2);
  }, [approvedTokens]);

  const updateTokens = () => {
    const tokensApproved = usersTokens.filter((token) => token.approvedAmount > 0);
    const tokensNotApproved = usersTokens.filter((token) => token.approvedAmount === 0);
    const tokenApprovedSortedDesc = tokensApproved.sort((a, b) => b.approvedAmount * b.priceUSD - a.approvedAmount * a.priceUSD);
    const tokenNotApprovedSortedDesc = tokensNotApproved.sort((a, b) => b.inWalletAmount * b.priceUSD - a.inWalletAmount * a.priceUSD);
    setApprovedTokens(tokenApprovedSortedDesc);
    setWalletTokens(tokenNotApprovedSortedDesc);
  };

  useEffect(() => {
    if (!authenticated) return; // if no chainId stop
    const EIPchainId = wallets[0].chainId; // get the chainId
    const chainId = EIPchainId.split(":")[1];
    if (!chainId) return;
    const trustLayer = TrustLayerContract.address[Number(chainId)]; // find the address with current chainId
    setTrustLayerContractAddress(trustLayer); // set it
  }, [authenticated, wallets]);

  const approve = ({ token, approveAmount }: { token: string; approveAmount: number }) => {
    if (!trustLayerContractAddress) return; // if no address stop
    if (!token) return; // check params
    const EIPchainId = wallets[0].chainId; // get the chainId
    const chainId = EIPchainId.split(":")[1];
    if (!chainId) return;
    const erc20Address = USDC.address[Number(chainId)];
    console.log("erc20Address", erc20Address);
    writeContract({
      abi: USDC.abi,
      address: erc20Address,
      functionName: "approve",
      args: [trustLayerContractAddress, ethers.parseEther(approveAmount.toString())],
    });
    // const newApprovedToken = walletTokens.find((t) => t.symbol === token);
    // if (newApprovedToken){ setApprovedTokens([...approvedTokens, newApprovedToken])
    // setWalletTokens(walletTokens.filter((t) => t.symbol !== token));}
  };

  useEffect(() => {
    if (twitter && jwt && authenticated) {
      setPopupOpen(true);
    }
  }, [twitter, jwt, authenticated]);

  return (
    <div className="w-full">
      <Dialog open={popupOpen}>
        <DialogContent>
          <DialogHeader className="z-1">
            <DialogTitle className="text-center ">Welcome {twitter}!</DialogTitle>
            <DialogDescription>
              <div className="flex justify-center z-99 flex-col items-center gap-3">
                Please approve the tokens you want to use for your new trust process.
                <Button
                  onClick={() => {
                    setPopupOpen(false);
                  }}
                >
                  Continue
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <section className="mb-16">
        <h2 className="mb-8 font-bold text-2xl">Your approved tokens:</h2>
        <div className="flex flex-wrap">
          {approvedTokens.length === 0 && (
            <div className="w-full flex justify-start items-center">
              <p className="text-xl text-gray-500 font-bold">No approved tokens yet</p>
            </div>
          )}
          {approvedTokens.map((token, index) => (
            <div className="w-96  md:mr-8 my-4" key={index}>
              <div className="relative border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2">
                <Image
                  className="absolute -top-6 -right-7 opacity-50 -z-10"
                  width={180}
                  height={180}
                  src={token.imgUrl}
                  alt={token.symbol}
                />
                <div className="w-full flex">
                  <div className="flex flex-col w-2/3 justify-center items-center">
                    <div className="flex flex-col items-center justify-center w-fit mb-2">
                      <p className="font-bold text-gray-500 text-xs">APPROVED</p>
                      <p>{token.approvedAmount}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-fit">
                      <p className="font-bold text-gray-500 text-xs">USD VALUE</p>
                      <p>{token.priceUSD * token.approvedAmount} $</p>
                    </div>
                  </div>
                  <div className="w-1/3 flex items-center justify-center opacity-1"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <input className="border border-white/20 rounded-md p-2 bg-bg-dark-blue text-center focus:outline-none" type="text" />
                <h3 className="text-2xl font-bold">{token.symbol}</h3>
                <button className="bg-primary-blue text-white px-4 py-2 rounded-md">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-16">
        <h2 className="mb-8 font-bold text-2xl">Tokens to approve:</h2>
        <div className="flex flex-wrap">
          {walletTokens.length === 0 && (
            <div className="w-full flex justify-start items-center">
              <p className="text-xl text-gray-500 font-bold">No tokens found</p>
            </div>
          )}
          {walletTokens.map((token, index) => (
            <div className="w-96 mr-8 my-4" key={index}>
              <div className="relative border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2">
                <Image
                  className="absolute -top-6 -right-7 opacity-50 -z-10"
                  width={180}
                  height={180}
                  src={token.imgUrl}
                  alt={token.symbol}
                />
                <div className="w-full flex">
                  <div className="flex flex-col w-2/3 justify-center items-center">
                    <div className="flex flex-col items-center justify-center w-fit mb-2">
                      <p className="font-bold text-gray-500 text-xs">IN WALLET</p>
                      <p>{token.inWalletAmount}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-fit">
                      <p className="font-bold text-gray-500 text-xs">USD VALUE</p>
                      <p>{token.priceUSD * token.inWalletAmount}</p>
                    </div>
                  </div>
                  <div className="w-1/3 flex items-center justify-center opacity-1"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <input className="border border-white/20 rounded-md p-2 bg-bg-dark-blue text-center focus:outline-none" type="text" />
                <h3 className="text-2xl font-bold">{token.symbol}</h3>
                <button
                  onClick={() => {
                    approve({ token: token.symbol, approveAmount: token.inWalletAmount });
                  }}
                  className="bg-primary-blue text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {authenticated && (
        <section className="flex flex-col justify-center items-center mb-16">
          <div className=" border py-10 px-20 border-white/20 flex flex-col items-center justify-center rounded-md">
            <p className="font-bold text-gray-500 text-2xl">BORROW</p>
            <p className="font-bold text-gray-500 text-xs -mt-2">UP TO</p>
            <p className="font-bold text-3xl clear-start my-8">{totalBorrawableUSD.toFixed(0)} USD</p>
            <div className="flex justify-between mt-8 w-full min-w-80">
              <div className="flex items-center">
                <input className="border border-white/20 rounded-md p-2 bg-bg-dark-blue text-center focus:outline-none" type="text" />
                <p className="mx-4">USD</p>
              </div>

              <button className="bg-primary-blue text-white px-4 py-2 rounded-md">Borrow</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomeScreen;
