export interface Network {
  value: string; // value in usdzzz
  links: number; // number in network
  approved: string; // value in usd approved by user
}
export interface TToken {
  symbol: string;
  address: string;
  approvedAmount: number;
  inWalletAmount: number;
  priceUSD: number;
  imgUrl: string;
}
