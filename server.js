const app = require('./src/app');
const config = require('config');

//! connect to db
const connectDB = require('./src/database/db-connection');
connectDB();

const port = process.env.PORT;
env = config.env;
app.listen(port, () => {
    console.log(`Server started on port ${port} in ${env}`);
});