const bcrypt = require('bcryptjs');
const Joi = require('joi');
const UserService = require('../../services/user-services');
module.exports = async(req, res, next) => {
    const {
        email,
        password
    } = req.body;

    // validate the request
    const result = await schemas.register.validateAsync({
        email,
        password,
    });

    hash = await bcrypt.hash(password, 10);
    user = await UserService.createUser(email, hash)

    // data response to send to api
    var responseData = {
        email: user.email,
        _id: user._id
    };
    return send.success(res, 'register complete', responseData);
}

// the register user schema
const schemas = {
    register: Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
            .min(4)
            .required(),

        // repeat_password: Joi.ref('password'),
    }),


}