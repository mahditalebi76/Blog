const jwt = require('jsonwebtoken');
const randToken = require('randomstring');
const createError = require('http-errors');
const User = require('../../database/models/user')


module.exports = {

    makeTokens: async (user) => {

        const jwtSecret = process.env.JWTSECRET;
        //create jwt
        const jwtpayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        };

        accessToken = jwt.sign(jwtpayload, jwtSecret, {
            expiresIn: '15s',
        });

        refreshToken = jwt.sign({
            id: user._id
        }, jwtSecret, {
            expiresIn: '1y',
        });
        returnData = {
            refreshToken,
            accessToken
        }
        return returnData
    },

    verifyRefreshToken: async (refreshToken, id) => {
        const jwtSecret = process.env.JWTSECRET;
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
                if (err) {
                    return reject(createError.Unauthorized())
                }
                if (id === decoded.id) {
                    user = await User.findOne({
                        _id: id,
                        refreshToken: refreshToken,
                    });
                    if (!user) {
                        return reject(createError.Unauthorized())
                    }
                } else {
                    return reject(createError.Unauthorized())
                }
                return resolve(true)

            })
        })
    }
}