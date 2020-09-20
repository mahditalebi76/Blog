const User = require('../../../database/models/user')
const send = require('../../middlewares/send');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const jwtHelper = require('../../helpers/jwtHelper');

module.exports = async (req, res, next) => {
    const jwtSecret = process.env.JWTSECRET;
    // get parameteres from request
    var {
        refreshToken,
        id
    } = req.body;

    try {
        valid = await jwtHelper.verifyRefreshToken(refreshToken, id)
    } catch (error) {
        return next(error)
    }

    var {
        accessToken,
        refreshToken
    } = await jwtHelper.makeTokens(user);

    user = await User.findOneAndUpdate({
        _id: id,
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


    // process the request task
};