const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	// replace ids with the referenced recipe documents
	const users = await User.find({}).populate('recipes')
	response.json(users)
})


usersRouter.delete('/:username', async (request, response) => {
	const usernameToDelete = request.params.username
	try {
		const deletedUser = await User.findOneAndDelete({ username: usernameToDelete })

		if (deletedUser) {
			response.status(204).end() // Recipe found and deleted successfully
		} else {
			response.status(404).json({ message: 'Username not found' }) // Recipe not found
		}
	} catch (error) {
		console.error('Error finding and deleting user:', error)
		response.status(500).json({ message: 'Internal server error' }) // Server error
	}
})

module.exports = usersRouter