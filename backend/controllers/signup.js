const signupRouter = require('express').Router()
const config = require('../utils/config')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('../models/user')

const confirmationTokens = new Map()

signupRouter.post('/register', async (request, response) => {

	function generateToken() {
		const token = crypto.randomBytes(20).toString('hex') // generate a random token
		const expirationTime = Date.now() + 10 * 60 * 1000 // token expires in 10 min

		return {
			token,
			expires: expirationTime
		}
	}

	const { username, email, password } = request.body
	const existingUser = await User.findOne({ $or: [{ username }, { email }] })

	if (existingUser) {
		return response.status(400).json({ error: 'Username or email is already in use.' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		email,
		passwordHash
	})


	const tokenInfo = generateToken()
	const confirmationToken = await bcrypt.hash(tokenInfo.token, saltRounds) 

	// save the token in the user's account
	user.confirmationToken = confirmationToken
	user.confirmationTokenExpires = tokenInfo.expires

	// store the token and associated user data temporarily
	confirmationTokens.set(confirmationToken, { username, email, passwordHash, expires: tokenInfo.expires })

	// send a confirmation email
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.AUTH_USER,
			pass: config.AUTH_PASS,
		},
	})

	const confirmationLink = `https://foodopiapp.fly.dev/confirm?token=${confirmationToken}`

	const mailOptions = {
		from: config.AUTH_USER,
		to: email,
		subject: 'Confirm Your Email Address',
		text: `Click the following link to confirm your email address: ${confirmationLink}`,
	}

	try {
		await transporter.sendMail(mailOptions)
		response.status(201).json({ message: 'Registration successful. Please check your email for confirmation.' })
	} catch (error) {
		console.error(error)
		response.status(500).json({ error: 'Internal server error' })
	}
})


signupRouter.post('/confirm', async (request, response) => {
	const { token } = request.body

	// check if the token exists in the map
	if (!confirmationTokens.has(token)) {
		return response.status(400).json({ error: 'Invalid confirmation token. (Refresh for slower networks)' })
	}

	// find the associated user data in the map
	const userData = confirmationTokens.get(token)


	// check if the token has expired
	if (userData.expires < Date.now()) {
		confirmationTokens.delete(token)
		return response.status(400).json({ error: 'Expired confirmation token.' })
	}

	const { username, email, passwordHash } = userData


	const newUser = new User({
		username,
		email,
		passwordHash,
	})

	await newUser.save()

	confirmationTokens.delete(token)
	response.status(200).json({ message: 'Email address confirmed. You can now log in.' })
})

module.exports = signupRouter