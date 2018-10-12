const web3 = require('./web3');
const GiftFactory = require('./build/Factory.json')

const factoryInstance = new web3.eth.Contract(
	JSON.parse(GiftFactory.interface),
	'0xc098d76695ca489a7204f07ca12463c177db0a24'
)

async function blah() {
	let output = await factoryInstance.methods.deployedCampaigns('0').call();
	console.log(output);
}

blah();

module.exports = factoryInstance;