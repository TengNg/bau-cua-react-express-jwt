// const allowedOrigins = require('../config/allowedOrigins');

const credentials = (_, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
}

module.exports = credentials
