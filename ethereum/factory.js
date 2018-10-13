const web3 = require('./web3');
const GiftFactory = require('./build/Factory.json')

const factoryInstance = new web3.eth.Contract(
	JSON.parse(GiftFactory.interface),
	'0x8414aec6832a476358417d0bbe039719cc7368e5'
)

module.exports = factoryInstance;