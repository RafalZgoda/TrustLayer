import { ethers } from "hardhat";


async function main() {

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  console.log("usdc deployed to:", usdc.target);

  const APE = await ethers.getContractFactory("APE");
  const ape = await APE.deploy();
  console.log("usdc deployed to:", ape.target);
  
  const PSG = await ethers.getContractFactory("PSG");
  const psg = await PSG.deploy();
  console.log("usdc deployed to:", psg.target);

  const TrustLayer = await ethers.getContractFactory("TrustLayer");
  const trustLayer = await TrustLayer.deploy();
  console.log("usdc deployed to:", trustLayer.target);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
