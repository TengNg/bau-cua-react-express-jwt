const User = require('../models/User.js');

const updateUserAccount = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(204);
    const refreshToken = cookies.token;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // handle when user change username or password
    const { username, password, gameData } = req.body;

    if (!username || !password) {
        next();
    }

    console.log('current-gamedata: ' + gameData);

    const currentUser = await User.findOneAndUpdate({ refreshToken: foundUser.refreshToken }, { gameData: gameData }, { new: true });
    console.log(currentUser);

    res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json({
        msg: "user info saved",
    });
}

module.exports = { updateUserAccount };
