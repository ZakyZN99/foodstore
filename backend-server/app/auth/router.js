const router = require('express').Router();
const authController = require('./controller');
const password = require('passport');
const LocalStrategy = require('passport-local').Strategy;

password.use(new LocalStrategy({usernameField: 'email'}, authController.localStrategy));
router.post('/register', authController.register);
// router.get('/cekEmail/:email', authController.cekEmail);
router.post('/login', authController.login);
router.get('/me', authController.me);
router.post('/logout', authController.logout);

module.exports = router