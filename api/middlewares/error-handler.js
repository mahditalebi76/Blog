const send = require('./send');

module.exports = async (err, req, res, next) => {
	console.log(err)
	if (err.isJoi) {
		return res.status(422).json({
			status: 'fail',
			message: err.message,
			error: err
		})
	}

	statusCode = err.statusCode || 500;
	status = `${err.status}`.startsWith('4') ? 'fail' : 'error' || err.status || 'error';
	message = err.message
	// res.status(err.statusCode).json(err);

	return res.status(statusCode).json({
		status: status,
		message: message,
		error: err
	});
};