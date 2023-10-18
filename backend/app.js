// establish the connection to the database

const config = require('./utils/config')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


const recipeRouters = require('./controllers/recipes')
const userRouters = require('./controllers/users')
const loginRouters = require('./controllers/login')
const categoriesRouters = require('./controllers/categories')
const signupRouters = require('./controllers/signup')

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})



app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/recipes', recipeRouters)
app.use('/api/users', userRouters)
app.use('/api/login', loginRouters)
app.use('/api/categories', categoriesRouters)
app.use('/api/signup', signupRouters)

// catch-all route to serve 'index.html'
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
		if (err) {
			res.status(500).send(err)
		}
	})
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app