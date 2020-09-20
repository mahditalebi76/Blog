const app = require('./app');
const config = require('config');


const port = process.env.PORT
env = config.env
app.listen(port, () => {
	console.log(`Server started on port ${port} in ${env}`);
});