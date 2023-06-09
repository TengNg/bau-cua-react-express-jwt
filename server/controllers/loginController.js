require('dotenv').config();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const isLoggedIn = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.status(401).json({ msg: "error" });
    return res.status(200).json({ msg: "user is logged in" });
};

const handleLogin = async (req, res) => {
    const { username, password, gameData } = req.body;

    if (!username || !password) res.status(400).json({ msg: "Username and password are required" });

    const foundUser = await User.findOne({ username });
    if (!foundUser) res.status(401).json({ msg: "Unauthorized" });

    const validPwd = await bcrypt.compare(password, foundUser.password);
    if (!validPwd) return res.status(400).json({ msg: "Password is incorrect" });

    const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
    );

    const currentUser = await User.findOneAndUpdate({ username }, { gameData, refreshToken }, { new: true });

    res.cookie(
        'token',
        refreshToken,
        {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }
    );

    return res.status(200).json({
        currentUser,
        accessToken,
        refreshToken,
    });
};

module.exports = { isLoggedIn, handleLogin };
