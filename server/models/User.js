const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    gameData: {
        totalMoney: {
            type: Number,
            required: true,
            default: 100_000,
        },
        betSize: {
            type: Number,
            required: true,
            default: 5000,
        },
        // history: {
        //
        // }
    },
    refreshToken: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('User', UserSchema);

