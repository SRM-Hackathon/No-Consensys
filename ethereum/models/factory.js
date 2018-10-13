const web3 = require('../web3');
const Factory = require('../factory');

module.exports.createNewDonationRequest = async function(sender, amount) {
	await Factory.methods.CreateNewDonationRequest(amount).send({
		from: sender,
		gas: '1000000'
	});
}

module.exports.registerDonor = async function(sender) {
	await Factory.methods.registerDonor().send({
		from: sender,
		gas: '1000000'
	});
}

module.exports.registerNgo = async function(sender) {
	await Factory.methods.registerNgo().send({
		from: sender,
		gas: '1000000'
	});
}

module.exports.registerMerchant = async function(sender) {
	await Factory.methods.registerMerchant().send({
		from: sender,
		gas: '1000000'
	});
}

module.exports.checkDonor = async function(address) {
	return await Factory.methods.findDonor(address).call();
}

module.exports.checkNgo = async function(address) {
	return await Factory.methods.findNgo(address).call();
} 

module.exports.checkMerchant = async function(address) {
	return await Factory.methods.findMerchant(address).call();
}