const router = require('express').Router();
const NgoController = require('../controllers/ngoController');

router.get('/', NgoController.listAllNgos);
router.get('/:id', NgoController.findNgoById);

router.post('/', NgoController.createNgo);

module.exports = router;