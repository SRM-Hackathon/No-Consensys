const router = require('express').Router();
const NgoRouter = require('./ngoRouter');

router.use('/ngos/', NgoRouter);

module.exports = router;