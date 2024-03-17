import { useState, useEffect } from "react";
import Image from "next/image";
import _ from "lodash";
import { TToken } from "@/lib/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
const HomeScreen: React.FC = () => {
  const {authenticated} = usePrivy();
  const [approvedTokens, setApprovedTokens] = useState<TToken[]>([]);
  const [walletTokens, setWalletTokens] = useState<TToken[]>([]);
  const [totalBorrawableUSD, setTotalBorrawableUSD] = useState<number>(0);
  const [borrowableTokens, setBorrowableTokens] = useState<TToken[]>([]);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const searchParams = useSearchParams()
 
  const twitter = searchParams.get('twitter')
  const jwt = searchParams.get('jwt')

  useEffect(() => {
    const total = 10984;
    setTotalBorrawableUSD(total / 2);
  }, [approvedTokens]);

  useEffect(() => {
    const approvedtokens = [
      {
        symbol: "USDC",
        address: "0x",
        approvedAmount: 735,
        inWalletAmount: 10000,
        priceUSD: 1,
        imgUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
      {
        symbol: "CHZ",
        address: "0x",
        approvedAmount: 4723,
        inWalletAmount: 10000,
        priceUSD: 0.13,
        imgUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/4066.png",
      },
      {
        symbol: "stETH",
        address: "0x",
        approvedAmount: 0.32,
        inWalletAmount: 1,
        priceUSD: 3786,
        imgUrl: "https://cryptologos.cc/logos/steth-steth-logo.png",
      },
    ];
    const tokensSorted = _.sortBy(approvedtokens, (token: TToken) => token.priceUSD * token.approvedAmount);
    setApprovedTokens(tokensSorted);
  }, []);

  useEffect(() => {
    const approvedtokens = [
      {
        symbol: "APE",
        address: "0x",
        approvedAmount: 0,
        inWalletAmount: 234,
        priceUSD: 2.19,
        imgUrl: "https://cryptologos.cc/logos/apecoin-ape-ape-logo.png",
      },
      {
        symbol: "USDT",
        address: "0x",
        approvedAmount: 0,
        inWalletAmount: 546,
        priceUSD: 1,
        imgUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      },
    ];
    const tokensSorted = _.sortBy(approvedtokens, (token: TToken) => token.priceUSD * token.approvedAmount);
    setWalletTokens(tokensSorted);
  }, []);

  useEffect(() => {
    const borrowableTokens = [
      {
        symbol: "USDC",
        address: "0x",
        approvedAmount: 0,
        inWalletAmount: 0,
        priceUSD: 1,
        imgUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
      {
        symbol: "stETH",
        address: "0x",
        approvedAmount: 0,
        inWalletAmount: 0,
        priceUSD: 3786,
        imgUrl: "https://cryptologos.cc/logos/steth-steth-logo.png",
      },
    ];
    setBorrowableTokens(borrowableTokens);
  }, []);

  useEffect(() => {
    if (twitter && jwt && authenticated) {
      setPopupOpen(true)
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
                  <Button onClick={()=>{ setPopupOpen(false); }}>Continue</Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      <section className="mb-16">
        <h2 className="mb-8 font-bold text-2xl">Your approved tokens:</h2>
        <div className="flex flex-wrap">
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
          {walletTokens.map((token, index) => (
            <div className="w-96 mr-8" key={index}>
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
                <button className="bg-primary-blue text-white px-4 py-2 rounded-lg">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mb-16">
        <div className=" border py-10 px-20 border-white/20 flex flex-col items-center justify-center rounded-md">
          <p className="font-bold text-gray-500 text-2xl">BORROW</p>
          <p className="font-bold text-gray-500 text-xs -mt-2">UP TO</p>
          <p className="font-bold text-3xl clear-start my-8">{totalBorrawableUSD.toFixed(0)} USD</p>
          <div className="flex justify-between mt-8 w-full min-w-80">
            <div className="flex">
              <input className="border border-white/20 rounded-md p-2 bg-bg-dark-blue text-center focus:outline-none" type="text" />
              <Select>
                <SelectTrigger className="w-24 focus:outline-none mx-4 bg-bg-dark-blue">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {borrowableTokens.map((token, index) => (
                      <SelectItem key={index} value={token.symbol}>
                        {token.symbol}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <button className="bg-primary-blue text-white px-4 py-2 rounded-md">Borrow</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
