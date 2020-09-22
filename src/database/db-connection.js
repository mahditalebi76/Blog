const mongoose = require('mongoose');
const config = require('config')
dbURI = process.env.DBURI



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbURI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB connected to ${conn.connection.host} database ${conn.connection.name}`)
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}

module.exports = connectDB;