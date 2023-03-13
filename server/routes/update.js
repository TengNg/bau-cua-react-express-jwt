const express = require('express');
const router = express.Router();
const { updateUserAccount } = require('../controllers/updateController');

router.post('/', updateUserAccount);

module.exports = router;
