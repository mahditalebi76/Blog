const User = require('../../../database/models/user')
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/user-services');

const jwtHelper = require('../../services/jwt-services');

module.exports = async(req, res, next) => {

    // get parameteres from request
    var {
        refreshToken,
        id
    } = req.body;

    //call the service
    try {
        valid = await jwtHelper.verifyRefreshToken(refreshToken, id)
    } catch (error) {
        return next(error)
    }

    var {
        accessToken,
        refreshToken
    } = await jwtHelper.makeTokens(user);
    user = await UserService.updateUserRefreshToken(id, refreshToken)


    responseData = {
        accessToken,
        refreshToken,
        user,
    };

    return send.success(res, 'new tokens generated', responseData);


    // process the request task
};