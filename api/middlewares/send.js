class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports.error = (next, message, statusCode) => {
	statusCode = statusCode || 500
	return next(new AppError(message, statusCode));
};
module.exports.fail = (next, message, statusCode) => {
	statusCode = statusCode || 400
	return next(new AppError(message, statusCode));
};

module.exports.success = (res, message, data) => {
	return res.status(200).json({
		status: 'success',
		message,
		data,
	});
};