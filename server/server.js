const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const credentials = require('./middlewares/credentials.js');
const errorHandler = require('./middlewares/errorHandler.js');
const corsOptions = require('./config/corsOptions.js');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/myapp');

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// servers static files
app.use('/', express.static(path.join(__dirname, '/public')));

const rootRoute = require('./routes/root.js');
const registerRoute = require('./routes/register.js');
const loginRoute = require('./routes/login.js');
const gameDataRoute = require('./routes/gameData.js');
const refreshTokenRoute = require('./routes/refresh.js');
const updateRoute = require('./routes/update.js');
const logoutRoute = require('./routes/logout.js');

app.use('/', rootRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/gameplay', gameDataRoute);
app.use('/refresh', refreshTokenRoute);
app.use('/update', updateRoute);
app.use('/logout', logoutRoute);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

