import { ethers } from "hardhat";

async function main() {
  const UsersWhitelist = await ethers.getContractFactory("UsersWhitelist");
  const whitelist = await UsersWhitelist.deploy();

  await whitelist.deployed();

  console.log(`UsersWhitelist  deployed to ${whitelist.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
