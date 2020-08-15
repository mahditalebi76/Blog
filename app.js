const express = require('express');
const app = express();

//dotenv config
const dotenv = require('dotenv');
dotenv.config({
	path: './config/config.env',
});

//rate limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 1000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//body-parser
const bodyParser = require('body-parser');
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

//security measures
const cors = require('cors');
const helmet = require('helmet');
app.use(cors());
app.use(helmet());


//connect to db
const connectDB = require('./database/db-connection')
connectDB();


module.exports = app;