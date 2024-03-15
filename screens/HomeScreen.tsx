import { useState } from "react";
import Image from "next/image";

const HomeScreen: React.FC = () => {
  const [approvedTokens, setApprovedTokens] = useState<
    {
      symbol: string;
      address: string;
      approvedAmount: number;
      inWalletAmount: number;
      priceUSD: number;
      imgUrl: string;
    }[]
  >([
    {
      symbol: "USDC",
      address: "0x",
      approvedAmount: 100,
      inWalletAmount: 100,
      priceUSD: 1,
      imgUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    {
      symbol: "CHZ",
      address: "0x",
      approvedAmount: 100,
      inWalletAmount: 100,
      priceUSD: 1,
      imgUrl: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
    },
  ]);

  return (
    <div className="w-full">
      <h1 className="text-primary-blue text-center font-bold text-5xl">Dashboard</h1>
      <div>
        <h2 className="mb-8">Your approved tokens:</h2>
        <div className="flex">
          {approvedTokens.map((token, index) => (
            <div className="relative border border-white/20 rounded-md hover:border-white/60 transition-all mr-8" key={index}>
              <Image width={96} height={96} src={token.imgUrl} alt={token.symbol} />
              <h3>{token.symbol}</h3>
              <p>Approved: {token.approvedAmount}</p>
              <p>In wallet: {token.inWalletAmount}</p>
              <p>Approved USD value: ${token.priceUSD * token.approvedAmount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
