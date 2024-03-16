import { ethers } from "hardhat";

async function main() {
  const TrustLayer = await ethers.getContractFactory("TrustLayer");
  const trustLayer = await TrustLayer.deploy();

  console.log("TrustLayer deployed to:", trustLayer.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
