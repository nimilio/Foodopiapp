const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	// search user in database
	const user = await User.findOne({ username })
	// check password with bcrypt since passwords are not saved to the database
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	// 401 unauthorised
	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	// create token,  expires in 60*60 seconds
	const token = jwt.sign(userForToken, process.env.SECRET,
		{ expiresIn: 2 }
	)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter