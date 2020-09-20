const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');


module.exports = (passport) => {
	const jwtSecret = process.env.JWTSECRET;
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = jwtSecret;
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			if (jwt_payload) {
				return done(null, jwt_payload);
			} else {
				return done(null, false);
			}
		})
	);
};