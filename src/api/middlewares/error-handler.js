module.exports = async(err, req, res, next) => {
    console.log(err)

    //joi error
    if (err.isJoi) {
        return joiError(err, req, res);
    }

    //mongoose unique error
    else if (err.name === 'MongoError' && err.code === 11000) {
        return mongooseUniqueError(err, req, res);

    }

    //default error
    else {
        return defaultError(err, req, res);
    }


};



const joiError = async(err, req, res) => {
    const {
        details
    } = err;
    const error = new Object();
    await details.forEach(item => {

        var error = {
            name: 'ValidationError',
            message: item.message,
            path: item.path[0],
            value: item.context.value
        }

        return res.status(422).json({
            status: 'fail',
            message: err.message,
            error
        })
    });

};


const mongooseUniqueError = async(err, req, res) => {
    keyValue = err.keyValue;
    Object.keys(err.keyValue).forEach(key => {
        path = key;
        value = err.keyValue[key];
        message = `Path {${path}} with value {${value}} is not unique`;

        error = {
            name: 'uniqueField',
            message,
            path,
            value
        }

        return res.status(500).json({
            status: 'error',
            message,
            error
        });

    });

}


const defaultError = async(err, req, res) => {
    statusCode = err.statusCode || 500;
    status = `${err.status}`.startsWith('4') ? 'fail' : 'error' || err.status || 'error';
    message = err.message

    return res.status(statusCode).json({
        status: status,
        message: message,
        error: err
    });
}