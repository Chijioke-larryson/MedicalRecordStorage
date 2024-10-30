require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "";
const goerliApiKey = process.env.GOERLI_API_KEY;
const mumbaiApiKey = process.env.MUMBAI_API_KEY;
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/1de769b8bc2b4813969975269d9f9230",
      chainId: 11155111, // Sepolia Chain ID
    },
    
    
  },
};

