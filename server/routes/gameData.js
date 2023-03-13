const express = require('express');
const router = express.Router();
const { getGameData } = require('../controllers/gameDataController.js');
const { authenticateToken } = require('../middlewares/authenticateToken.js')

router.get('/', authenticateToken, getGameData);

module.exports = router;
