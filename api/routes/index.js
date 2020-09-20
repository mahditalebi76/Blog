const router = require('express').Router();
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const register = require('../controllers/user/register');
const login = require('../controllers/user/login');

const users = require('./user');

router.post('/register', asyncHandler(register.register));
router.post('/login', asyncHandler(login));

router.use('/users', users)

// Read each file in the routes directory
fs.readdirSync(__dirname).forEach(function (route) {
    excludes = ['index', 'users']
    // Strip the .js suffix
    route = route.split('.')[0];
    // Ignore index (i.e. this file)
    if (excludes.includes(route)) return;
    // Mount router
    router.use('/' + route, require('./' + route + '.js'));
});



module.exports = router;