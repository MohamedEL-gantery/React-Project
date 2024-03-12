const express = require('express');
const authController = require('../controllers/authController');
const upload = require('../middlewares/multer');

const router = express.Router();

router.route('/signup').post(upload.single('media'), authController.signup);

router.route('/login').post(authController.login);

router.route('/logout').get(authController.logout);

module.exports = router;
