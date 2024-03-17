export interface TToken {
  symbol: string;
  address: string;
  approvedAmount: number;
  inWalletAmount: number;
  priceUSD: number;
  imgUrl: string;
  approved: boolean;
}

const approvedtokens = [
  {
    symbol: "APE",
    address: "0x",
    approvedAmount: 0,
    inWalletAmount: 2304,
    priceUSD: 2.19,
    imgUrl: "https://cryptologos.cc/logos/apecoin-ape-ape-logo.png",
    approved: false,
  },
  {
    symbol: "USDC",
    address: "0x",
    approvedAmount: 0,
    inWalletAmount: 10000,
    priceUSD: 1,
    imgUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    approved: false,
  },
  {
    symbol: "USDT",
    address: "0x",
    approvedAmount: 0,
    inWalletAmount: 546,
    priceUSD: 1,
    imgUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    approved: false,
  },
  {
    symbol: "PSG",
    address: "0x",
    approvedAmount: 0,
    inWalletAmount: 2343,
    priceUSD: 5,
    imgUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5226.png",
    approved: false,
  },
  {
    symbol: "stETH",
    address: "0x",
    approvedAmount: 0,
    inWalletAmount: 1,
    priceUSD: 3786,
    imgUrl: "https://cryptologos.cc/logos/steth-steth-logo.png",
    approved: false,
  },
];

export const fetchUsersTokens = (address: string): TToken[] => {
  return approvedtokens;
};

export const fetchBorrowableTokens = (address: string): TToken[] => {
  return [
    {
      symbol: "USDC",
      address: "0x",
      approvedAmount: 0,
      inWalletAmount: 10000,
      priceUSD: 1,
      imgUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      approved: false,
    },
    {
      symbol: "PSG",
      address: "0x",
      approvedAmount: 0,
      inWalletAmount: 2343,
      priceUSD: 5,
      imgUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5226.png",
      approved: false,
    },
    {
      symbol: "APE",
      address: "0x",
      approvedAmount: 0,
      inWalletAmount: 234,
      priceUSD: 2.19,
      imgUrl: "https://cryptologos.cc/logos/apecoin-ape-ape-logo.png",
      approved: false,
    },
  ];
};
