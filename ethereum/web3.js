const Web3 = require('web3');

const infura = "https://rinkeby.infura.io/v3/49c91b1965874c20a3b96d5d5dd73b46"
let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //in browser and metamask is running
web3 = new Web3(window.web3.currentProvider)
} else {
  //On server || metamask not running
  const provider = new Web3.providers.HttpProvider(infura)
web3 = new Web3(provider)
}

module.exports = web3;