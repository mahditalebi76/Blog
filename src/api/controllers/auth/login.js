// const send = require('../../middlewares/send');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const jwtHelper = require('../../services/jwt-services');
const UserService = require('../../services/user-services');


module.exports = async(req, res, next) => {
    //get parameteres from request
    const {
        email,
        password
    } = req.body;

    //process the request task
    user = await UserService.findUserByEmail(email);

    if (user) {
        compare = await bcrypt.compare(password, user.hash);

        //email and password are correct
        if (compare) {
            //generate new Tokens
            const {
                accessToken,
                refreshToken
            } = await jwtHelper.makeTokens(user);

            //update refreshToken in database
            user = await UserService.updateUserRefreshToken(user._id, refreshToken)

            //create the response
            responseData = {
                accessToken,
                refreshToken,
                user,
            };

            return send.success(res, 'you have logged in', responseData);
        }
        //wrong password
        else {
            return next(
                createError.NotFound('User with this email and password not found.')
            );
        }

    } else if (!user) {
        //wrong email
        return next(
            createError.NotFound('User with this email and password not found.')
        );
    }
};