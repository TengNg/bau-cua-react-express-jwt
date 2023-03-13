require('dotenv').config();
const User = require('../models/User.js');

const getGameData = async (req, res) => {
    const { username } = req.user;
    const user = await User.findOne({ username });
    res.json({ user })
}

module.exports = { getGameData }
