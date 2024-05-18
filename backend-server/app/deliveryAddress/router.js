const { police_check } = require('../../middleware');
const deliveryAddressController = require('./controller')
const router = require('express').Router();

router.get('/delivery-address', police_check('view', 'DeliveryAddress'), deliveryAddressController.index);
router.post('/delivery-address', police_check('create', 'DeliveryAddress'), deliveryAddressController.store);
router.put('/delivery-address/:id', police_check('update', 'DeliveryAddress'), deliveryAddressController.update);
router.delete('/delivery-address/:id', police_check('delete', 'DeliveryAddress'), deliveryAddressController.destroy);


module.exports = router;