require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/GIpRxCdzbEyN6kZSaxjDODhb9wggMQqh',
      accounts: ['cb773229e28d67dc8a962ffc522bbf82857966ab069de5fdd17d49a8ffa437b1']
    }
  }
};
