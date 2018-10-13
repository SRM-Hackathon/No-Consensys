const Web3 = require('web3');
const hdWalletProvider = require('truffle-hdwallet-provider');

const mnu = 'inquiry hand genre grief swap chuckle slush rural access toss tube winter';
const infura = "https://rinkeby.infura.io/v3/17f550fa53624c1885bb1632a9905b6a"
let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //in browser and metamask is running
web3 = new Web3(window.web3.currentProvider)
} else {
  //On server || metamask not running
  const provider = new hdWalletProvider(mnu, infura)
web3 = new Web3(provider)
}

module.exports = web3;