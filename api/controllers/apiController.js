const PgClient = require('../app').PgClient;
const Factory = require('../../ethereum/models/factory');

module.exports.checkUser = async function(req, res) {
	let address = req.body.address;
	
	let isNgo = await Factory.checkNgo(address);
	let isDonor = await Factory.checkDonor(address);
	let isMerchant = await Factory.checkMerchant(address);

	if (isNgo) {
		res.json({
			exists: true,
			category: 'NGO',
			ngo: await findNgoByAddress(address)
		});
	} else if (isDonor) {
		res.json({
			exists: true,
			category: 'Donor',
			donor: await findDonorByAddress(address)
		});
	} else if (isMerchant) {
		res.json({
			exists: true,
			category: 'Merchant'
		});
	} else {
		res.json({
			exists: false
		});
	}
}

async function findNgoByAddress(address) {
	const query = `SELECT * FROM ngos WHERE acc_address=$1`;
	let result = await PgClient.query(query, [address]);

	if (result.rowCount == 0) {
		return Promise.reject('Could not find NGO');
	}

	return result.rows[0];
}

async function findDonorByAddress(address) {
	const query = `SELECT * FROM donors WHERE acc_address=$1`;
	let result = await PgClient.query(query, [address]);

	if (result.rowCount == 0) {
		return Promise.reject('Could not find donor');
	}

	return result.rows[0];
}