require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		hardhat: {
			chainId: 1337
		},
	},
	settings: {
		optimizer: {
			enabled: true,
			runs: 1000,
		},
	},
};
