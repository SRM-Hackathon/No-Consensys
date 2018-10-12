const router = require('express').Router();
const NgoController = require('../controllers/ngoController');

router.get('/', NgoController.listAllNgos);
router.post('/', NgoController.createNgo);

module.exports = router;