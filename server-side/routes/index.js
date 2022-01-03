const express = require('express')
const users = require('./userRoutes')


module.exports = app => {
	app.use(express.json(), users)
}
