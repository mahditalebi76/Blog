const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const register = require('../controllers/auth/register');
const login = require('../controllers/auth/login');
const passport = require('passport');
const newTokens = require('../controllers/auth/new-tokens');


/* 
//*register
*
*/
router.post('/register', asyncHandler(register));

/*
*
*
//*login
*/
router.post('/login', asyncHandler(login));

/*
*
*
//*generate new tokens
*/
router.post('/newTokens', newTokens);


/*
*
*
//*test for auth
*/
router.get(
    '/',
    passport.authenticate('jwt', {
        session: false,
    }),
    (req, res) => {
        return res.status(200).json({
            done: true,
        });
    }
);



module.exports = router;