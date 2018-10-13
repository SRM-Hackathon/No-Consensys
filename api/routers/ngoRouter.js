const router = require('express').Router();
const NgoController = require('../controllers/ngoController');

router.get('/', NgoController.listAllNgos);
router.get('/:id', NgoController.findNgoById);
router.get('/:id/donationRequests', NgoController.listAllDonationRequests);

router.post('/', NgoController.createNgo);

module.exports = router;