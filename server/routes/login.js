const express = require('express');
const router = express.Router();

const { isLoggedIn, handleLogin } = require('../controllers/loginController');

router.get('/', isLoggedIn);
router.post('/', handleLogin);

module.exports = router;
