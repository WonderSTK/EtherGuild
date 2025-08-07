// scripts/deploy.cjs
const hre = require("hardhat");

async function main() {
  const SimpleJobBoard = await hre.ethers.getContractFactory("SimpleJobBoard");
  const jobBoard = await SimpleJobBoard.deploy();
  await jobBoard.waitForDeployment();
  console.log("SimpleJobBoard deployed to:", jobBoard.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
