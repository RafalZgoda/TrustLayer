import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { ANKR_API_KEY, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: "celo",
  networks: {
    celo: {
      url: `https://rpc.ankr.com/celo/${ANKR_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    arbitrumTestnet: {
      url: `https://rpc.ankr.com/arbitrum_sepolia/${ANKR_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    sepolia: {
      url: `https://rpc.ankr.com/eth_sepolia/${ANKR_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    baseTestnet: {
      url: `https://rpc.ankr.com/base_sepolia/${ANKR_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    chiliz: {
      url: `https://rpc.ankr.com/chiliz`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
