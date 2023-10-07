// handling environment variables

require('dotenv').config()

const PORT = process.env.PORT || 3001

// different databases for development and testing
const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI

const AUTH_USER = process.env.AUTH_USER
const AUTH_PASS = process.env.AUTH_PASS
	
module.exports = {
	MONGODB_URI,
	PORT,
	AUTH_PASS,
	AUTH_USER
}