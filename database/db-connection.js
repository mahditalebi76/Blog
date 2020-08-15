const mongoose = require('mongoose');
dbURI = process.env.MONGO_URI



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbURI, {
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