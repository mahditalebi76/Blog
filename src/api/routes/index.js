const router = require('express').Router();
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

// Read each file in the routes directory
fs.readdirSync(__dirname).forEach(function (route) {
	excludes = ['index'];
	// Strip the .js suffix
	route = route.split('.')[0];
	// Ignore index (i.e. this file)
	if (excludes.includes(route)) return;
	// Mount router
	router.use('/' + route, require('./' + route + '.js'));
});

module.exports = router;