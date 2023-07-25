const { Router } = require('express');
const authController = require('../Controller/loginController');
const {requireAuth} = require("../Middleware/authenticationMW")
const router = Router();

router.get('/', authController.home);
router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);
router.get('/logout', authController.logout_get);
router.get('/courses', requireAuth  ,authController.courses);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);

module.exports = router;