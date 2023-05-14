// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
	const BestToken = await hre.ethers.getContractFactory("BestToken");
	const bestToken = await BestToken.deploy()
	await bestToken.deployed();

	await bestToken.mintBatch(
		'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
		[1, 2], [100, 1],
		hre.ethers.utils.solidityPack(['string'], ["HelloWorld!"]));

	await bestToken.mintBatch(
		'0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
		[1, 2], [1, 100],
		hre.ethers.utils.solidityPack(['string'], ["HelloWorld!"]));


	fs.writeFileSync(
		path.resolve(__dirname, '../../BestToken-address.json'),
		JSON.stringify({ BestToken: bestToken.address }, undefined, 2)
	)

	const contractArtifact = hre.artifacts.readArtifactSync("BestToken");

	fs.writeFileSync(
		path.resolve(__dirname, `../../BestToken.json`),
		JSON.stringify(contractArtifact, undefined, 2),
	)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
