const mongoose = require('mongoose')

mongoose
	.connect('mongodb://localhost:27017/pharmaInc', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Database connected!'))

module.exports = {
	mongoose,
}
