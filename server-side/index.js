const ServerApi = require('./server/server')

const start = async () => {
	const config = require('./config/config.json')
	const mongoose = require('./database/index')

	const server = new ServerApi()
	server.initialize().then(() => {
		const app = server.getApp()
		app.listen(config.port, () => {
			console.log(`Serviço na porta ${config.port} `)
		})
	})
}

start()
