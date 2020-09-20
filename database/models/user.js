const mongoose = require('mongoose');
const randToken = require('randomstring');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const schema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hash: {
		type: String,
		required: true,
		select: false,
	},
	refreshToken: {
		type: String,
		// default: () => {
		// 	return randToken.generate(24);
		// },
	},
	forgotPasswordToken: {
		type: String,
		select: false,
		default: () => {
			return randToken.generate({
				length: 4,
				charset: 'numeric',
			});
		},
	},
	smsToken: {
		type: String,
		select: false,
		default: () => {
			return randToken.generate({
				length: 4,
				charset: 'numeric',
			});
		},
	},
	name: String,
	birthday: Date,
	avatar: String
}, {
	timestamps: true,
});
schema.plugin(beautifyUnique);
module.exports = mongoose.model('User', schema);