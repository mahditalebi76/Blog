const User = require('../../../database/models/user')
const send = require('../../middlewares/send');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

module.exports = {
	register: async (req, res, next) => {
		//get parameteres from request
		const {
			email,
			password
		} = req.body;

		// validate the request
		const result = await schemas.register.validateAsync({
			email,
			password,
		});

		//process the request task
		hash = await bcrypt.hash(password, 10);

		user = await User.create({
			email,
			hash,
		});
		await user.save();

		// send response to api
		responseData = {
			email: user.email,
		};
		return send.success(res, 'register complete', responseData);
	}


}



const schemas = {
	register: Joi.object({
		// username:Joi.string().alphanum().min(3).max(30).required(),
		email: Joi.string().email().lowercase().required(),
		password: Joi.string()
			.pattern(/^[a-zA-Z0-9]{3,30}$/)
			.min(4)
			.required(),

		// repeat_password: Joi.ref('password'),
	}),


}