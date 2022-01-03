const { UserService } = require('../service')
const userService = new UserService()
const usersFile = require('../users.json');

module.exports = class UserController {

	 registerAllUsers = async (req, res) => {
		try {
			const users = this.getUsersFromFile(usersFile)
			const registerAllUsersParams = {users: users}
			const usersInDatabase = await userService.getAllUsers()
			this.checkIfDataInJsonIsLoaded(usersInDatabase);
			await userService.registerAllUsers(registerAllUsersParams)
			return res.status(200).json({
				msg: ` Base de dados criada com sucesso.`,
			})
		} catch (error) {
			console.error(error)
			return res.status(500).json(error.message)
		}
	}

	 getAllUsers = async (req, res) => {
		try {
			const users = await userService.getAllUsers()
			if(!users) throw new Error("Base da dados vazia.")
			return res.status(200).json(users)
		} catch (error) {
			return res.status(400).json(error)
		}
	}

	getUserById = async (req, res) => {
		try {
			return res
				.status(200)
				.json(await userService.getUserById(req.params.userId))
		} catch (error) {
			return res.status(400).json(error)
		}
	}

	 updateUserData = async (req, res) => {
		try {
			const updateUserParams = { userId: Number(req.params.userId), newData: req.body }
			console.log(updateUserParams);
			const updateResult = await userService.updateUserData(updateUserParams);
			if(!updateResult) throw new Error("Usuário não existe na base de dados.")
			return res
				.status(200)
				.json(updateResult)
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.message)
		}
	}


	 removeUser = async (req, res) => {
		try {
			const deleteResult = await userService.removeUser(req.params.userId)
			if(!deleteResult) throw new Error("Usuário não existe na base de dados.")
			return res.status(200).json(deleteResult)
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.message)
		}
	}

	getUsersFromFile =  (file) => {
		return file.results
	} 

	checkIfDataInJsonIsLoaded(usersInDatabase) {
		if (usersInDatabase.length) {
			throw new Error("O arquivo json já foi adicionado ao BD!");
		}
	}
}
