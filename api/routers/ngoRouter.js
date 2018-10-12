const router = require('express').Router();
const NgoController = require('../controllers/ngoController');

router.get('/', NgoController.listAllNgos);

module.exports = router;