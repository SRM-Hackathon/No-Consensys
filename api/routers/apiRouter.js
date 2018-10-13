const router = require('express').Router();
const NgoRouter = require('./ngoRouter');
const DonationRequestRouter = require('../routers/donationRequestRouter');
const Factory = require('../../ethereum/models/factory');

router.use('/ngos/', NgoRouter);
router.use('/donationRequests/', DonationRequestRouter);


router.post('/checkUser', async function(req, res) {
	let address = req.body.address;
	
	let ngo = await Factory.checkNgo(address);
	let donor = await Factory.checkDonor(address);
	let merchant = await Factory.checkMerchant(address);

	if (ngo) {
		res.json({
			exists: true,
			category: 'NGO'
		});
	} else if (donor) {
		res.json({
			exists: true,
			category: 'Donor'
		});
	} else if (merchant) {
		res.json({
			exists: true,
			category: 'Merchant'
		});
	} else {
		res.json({
			exists: false
		});
	}
});

module.exports = router;