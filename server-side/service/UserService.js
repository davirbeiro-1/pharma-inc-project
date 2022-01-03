const { Users } = require('../models/user')
module.exports = class UserService {
	constructor() {}

	registerAllUsers = async params => {
		try {
			const { users } = params
			const completeUsersData = this.setUsersId(users)
			return await Users.create(completeUsersData)
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	getAllUsers = async () => {
		try {
			return await Users.find()
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	getUserById = async userId => {
		try {
			return await Users.findOne({ userId: userId })
		} catch (error) {
			console.error(error)
			throw error
		}
	}


	updateUserData = async params => {
		const { userId, newData } = params
		try {
			return await Users.findOneAndUpdate({ userId: userId }, newData)
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	removeUser = async userId => {
		try {
			return await Users.findOneAndRemove({ userId: userId })
		} catch (error) {
			console.error(error)
			throw error
		}
	}


	setUsersId(users) {
		let initialUserId = 1
		users.forEach(async (element) => {

			Object.assign(element, { userId: initialUserId })
			initialUserId++
		})
		return users
	}
}
