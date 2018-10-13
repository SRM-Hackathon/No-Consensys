const router = require('express').Router();
const NgoRouter = require('./ngoRouter');
const DonationRequestRouter = require('../routers/donationRequestRouter');

router.use('/ngos/', NgoRouter);
router.use('/donationRequests/', DonationRequestRouter);

module.exports = router;