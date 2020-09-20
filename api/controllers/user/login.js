const User = require('../../../database/models/user');
const send = require('../../middlewares/send');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const jwtHelper = require('../../helpers/jwtHelper');
module.exports = async (req, res, next) => {
	//get parameteres from request
	const {
		email,
		password
	} = req.body;

	//process the request task

	var user = await User.findOne({
		email,
	}).select('email hash');

	if (user) {
		compare = await bcrypt.compare(password, user.hash);

		//email and password are correct
		if (compare) {
			var user = await User.findOne({
				email,
			});

			const {
				accessToken,
				refreshToken
			} = await jwtHelper.makeTokens(user);

			user = await User.findOneAndUpdate({
				email,
			}, {
				refreshToken: refreshToken,
			}, {
				new: true,
			});

			responseData = {
				accessToken,
				refreshToken,
				user,
			};

			return send.success(res, 'you have logged in', responseData);
		} else {
			return next(
				createError.NotFound('User with this email and password not found.')
			);
		}

	} else if (!user) {
		return next(
			createError.NotFound('User with this email and password not found.')
		);
	}
};