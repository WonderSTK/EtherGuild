const hre = require("hardhat");

async function main() {
  const networkName = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();

  console.log(`\n🚀 Deploying SimpleJobBoard to ${networkName}...`);
  console.log(`📝 Deployer address: ${deployer.address}`);
  
  // Get balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`💰 Deployer balance: ${hre.ethers.formatEther(balance)} ETH\n`);

  // Deploy the contract
  console.log("⏳ Deploying SimpleJobBoard contract...");
  const SimpleJobBoard = await hre.ethers.getContractFactory("SimpleJobBoard");
  const simpleJobBoard = await SimpleJobBoard.deploy();

  await simpleJobBoard.waitForDeployment();
  const contractAddress = await simpleJobBoard.getAddress();

  console.log(`✅ SimpleJobBoard deployed to: ${contractAddress}`);
  
  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
  };

  console.log(`\n📋 Deployment Summary:`);
  console.log(`   Network: ${deploymentInfo.network}`);
  console.log(`   Contract: ${deploymentInfo.contractAddress}`);
  console.log(`   Deployer: ${deploymentInfo.deployer}`);
  console.log(`   Block: ${deploymentInfo.blockNumber}`);
  console.log(`   Time: ${deploymentInfo.timestamp}`);

  // Wait for block confirmations on testnets/mainnet
  if (networkName !== "hardhat" && networkName !== "localhost") {
    console.log(`\n⏳ Waiting for 5 block confirmations...`);
    await simpleJobBoard.deploymentTransaction().wait(5);
    console.log(`✅ Contract confirmed!`);
  }

  // Save to file for reference
  const fs = require('fs');
  const path = require('path');
  
  const deploymentPath = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(deploymentPath, `${networkName}.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`\n💾 Deployment info saved to: deployments/${networkName}.json`);
  console.log(`\n🔗 Next steps:`);
  console.log(`   1. Update VITE_CONTRACT_ADDRESS in your .env file`);
  console.log(`   2. Update the contract address in src/hooks/useJobBoardContract.ts`);
  
  if (networkName === "sepolia" || networkName === "mainnet") {
    console.log(`   3. Verify the contract: npx hardhat verify --network ${networkName} ${contractAddress}`);
    console.log(`   4. View on Etherscan: https://${networkName === "mainnet" ? "" : "sepolia."}etherscan.io/address/${contractAddress}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
