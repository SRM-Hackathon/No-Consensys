const router = require('express').Router();
const NgoRouter = require('./ngoRouter');
const DonationRequestRouter = require('../routers/donationRequestRouter');

const ApiController = require('../controllers/apiController');

router.use('/ngos/', NgoRouter);
router.use('/donationRequests/', DonationRequestRouter);

router.post('/checkUser', ApiController.checkUser);

module.exports = router;