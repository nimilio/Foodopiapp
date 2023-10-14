const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


const resetCodes = new Map()

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

loginRouter.post('/resetCode', async (request, response) => {

	const { email } = request.body
	const existingUser = await User.findOne({ email })

	if (!existingUser) {
		return response.status(400).json({ error: 'No account with this email.' })
	}

	const resetCode = randomstring.generate(8)
	const codeExpirationTime = Date.now() + 10 * 60 * 1000


	// store the code and associated user data temporarily
	resetCodes.set(resetCode, { email, expires: codeExpirationTime })

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.AUTH_USER,
			pass: config.AUTH_PASS,
		},
	})

	const mailOptions = {
		from: config.AUTH_USER,
		to: email,
		subject: 'Password Reset Code',
		text: `Your password reset code is: ${resetCode}`,
	}


	// send the email which is within the mailOptions
	try {
		await transporter.sendMail(mailOptions)
		response.status(201).json({ message: 'Password reset code sent to your email.' })
	} catch (error) {
		console.error(error)
		response.status(500).json({ error: 'Internal server error' })
	}
})

loginRouter.put('/resetPass', async (request, response) => {
	const { resetCode, password } = request.body

	// Check if the token exists in the map
	if (!resetCodes.has(resetCode)) {
		return response.status(400).json({ error: 'Invalid reset code.' })
	}

	// Find the associated user data in the map
	const userData = resetCodes.get(resetCode)


	// Check if the token has expired
	if (userData.expires < Date.now()) {
		resetCodes.delete(resetCode)
		return response.status(400).json({ error: 'Expired reset code.' })
	}

	const { email } = userData

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	try {
		await User.findOneAndUpdate(
			{ email: email },
			{ passwordHash: passwordHash },
			{ new: true }
		)

		resetCodes.delete(resetCode)

		response.status(200).json({ message: 'You can now sign in with your new password' })
	} catch (error) {
		response.status(500).json({ error: 'Internal server error' })
	}
})


module.exports = loginRouter