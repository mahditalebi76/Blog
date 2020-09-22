const express = require('express');
const app = express();
const router = require('./api/routes/index');
var passport = require('passport');
const createError = require('http-errors')
const test = require('./test');

//! dotenv config
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env',
});

//! rate limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//! passport initialize
require('./api/middlewares/passport-jwt-config')(passport);

app.use(passport.initialize());

//! body-parser
const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

//! security measures
const cors = require('cors');
const helmet = require('helmet');
app.use(cors());
app.use(helmet());



//! router middleware
app.use('/', router);


//! handle false routes
app.all('*', (req, res, next) => {
    return next(createError.NotFound(`Can't find route ${req.originalUrl} on this server!`))
});


//! error handler middleware
const handler = require('./api/middlewares/error-handler');
global.send = require('./api/middlewares/send');

app.use(handler);

// test()

module.exports = app;