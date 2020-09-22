const User = require('../../database/models/user');


module.exports = {
    createUser: async(email, hash) => {
        user = await User.create({
            email,
            hash
        });
        return user.save();
    },

    findUserByEmail: async(email) => {
        var user = await User.findOne({
            email: email
        }).select('_id email hash')
        return user;
    },

    findUserById: async(_id) => {
        return User.findById(_id);
    },

    updateUserRefreshToken: async(_id, refreshToken) => {
        user = await User.findOneAndUpdate({
            _id
        }, {
            refreshToken,
        }, {
            new: true,
        });
        return user.save()
    },

    findAllUsers: async() => {
        users = await User.find({});
        return users;
    }



}