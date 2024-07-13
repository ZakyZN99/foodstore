const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const orderController = require('./controller');
const { police_check } = require('../../middleware');

router.get('/orders',  police_check('view','Order'),orderController.index);
router.post('/orders', police_check('create','Order'), orderController.store);


module.exports = router;