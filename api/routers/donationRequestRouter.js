const router = require('express').Router();
const DonationRequestController = require('../controllers/donationRequestController');

router.get('/', DonationRequestController.listAllDonationRequests);
router.get('/:id', DonationRequestController.findDonationRequestById);

module.exports = router;