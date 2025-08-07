// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const SimpleJobBoard = await hre.ethers.getContractFactory("SimpleJobBoard");
  const jobBoard = await SimpleJobBoard.deploy();
  await jobBoard.deployed();
  console.log("SimpleJobBoard deployed to:", jobBoard.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
