const router = require('express').Router()
const UserController = require('../controller/UserController')
const userController = new UserController()

router.post('/users', userController.registerAllUsers)
router.get('/users', userController.getAllUsers)
router.get('/users/:userId', userController.getUserById)
router.put('/users/:userId', userController.updateUserData)
router.delete('/users/:userId', userController.removeUser)

module.exports = router
