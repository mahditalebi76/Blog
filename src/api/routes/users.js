const router = require('express').Router();
const User = require('../../database/models/user');
const send = require('../middlewares/send');
const passport = require('passport');
const userGet = require('../controllers/user/get');



router.get('/:_id',
    passport.authenticate('jwt', {
        session: false
    }),
    userGet.singleUser);

router.get('/', passport.authenticate('jwt', {
    session: false
}), userGet.allUsers)



module.exports = router;