const router = require('express').Router();
const { police_check } = require('../../middleware');
const cartController = require('./controller');

router.put('/carts', police_check('update', 'Cart'), cartController.update);
router.get('/carts', police_check('read', 'Cart'), cartController.index);
router.delete('/carts/:id', police_check('delete', 'Cart'), cartController.deleteItem);

module.exports = router