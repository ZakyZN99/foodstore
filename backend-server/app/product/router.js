const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');
const { police_check } = require('../../middleware');

router.get('/product', productController.index);
router.get('/product/:id', productController.search);
router.post('/product', multer({dest: os.tmpdir()}).single('image_url'), police_check('create','Product'), productController.store);
router.put('/product/:id', multer({dest: os.tmpdir()}).single('image_url'), police_check('update', 'Product'), productController.update);
router.delete('/product/:id', multer({dest: os.tmpdir()}).single('image_url'), police_check('delete', 'Product'), productController.destroy);

module.exports = router;