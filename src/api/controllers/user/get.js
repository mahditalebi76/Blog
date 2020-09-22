const User = require('../../../database/models/user');
const UserService = require('../../services/user-services');



module.exports = {
    singleUser: async(req, res, next) => {
        _id = req.params._id
        user = await UserService.findUserById(_id);
        return send.success(res, 'user info', user)
    },

    allUsers: async(req, res, next) => {
        users = await UserService.findAllUsers()
        return send.success(res, 'all users', users)
    }


}