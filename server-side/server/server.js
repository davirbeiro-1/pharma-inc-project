const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const cookieParser = require('cookie-parser')

class ServerApi {
	constructor() {}

	configureRestService = async () => {
		const app = express()
		app.use(helmet())
		app.use(compression())
		app.use(cookieParser())
		app.use(cors({ origin: true, credentials: true }))
		app.use(express.json())
		app.use(express.urlencoded({ extended: false }))
		app.use('/v1/', require('../routes/userRoutes'))
		app.get('/', (req, res) => {
			res.status(200).json("REST Fullstack Challenge 20201209 Running")
		})
		this.app = app
	}

	initialize = async () => {
		await this.configureRestService()
	}

	getApp = () => {
		return this.app
	}
}

module.exports = ServerApi
