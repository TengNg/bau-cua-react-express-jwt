const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../controllers/loginController.js');
const { handleRegister } = require('../controllers/registerController');

router.get('/', isLoggedIn);
router.post('/', handleRegister);

module.exports = router;
