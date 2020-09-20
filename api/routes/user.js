const router = require('express').Router();
const User = require('../../database/models/user');
const send = require('../middlewares/send');
const passport = require('passport');
const newTokens = require('../controllers/user/newTokens');

const getUser = async (req, res, next) => {
    id = req.params.id
    user = await User.findOne({
        _id: id
    })
    return send.success(res, 'user info', user)
}


router.get('/:id',
    passport.authenticate('jwt', {
        session: false
    }), getUser);


router.post('/newTokens', newTokens)


module.exports = router;