
const recipesRouter = require('express').Router()
const Recipes = require('../models/recipe')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

recipesRouter.get('/', async (request, response, next) => {
	try {
		const recipes = await Recipes.find({}).populate('user', { username: 1 })
		response.json(recipes)
	} catch (error) {
		console.error('Error fetching recipes from the database:', error)
		next(error)
	}
})




recipesRouter.post('/', async (request, response, next) => {
	const body = request.body
	if (body.name === undefined) {
		return response.status(400).json({ error : 'Recipe name is missing' })
	}
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const recipe = new Recipes({
		name: body.name,
		url: body.url,
		author: body.author,
		ingredients: body.ingredients,
		category: body.category,
		method: body.method,
		id: body.id,
		user: user.id
	})

	try {
		const savedRecipe = await recipe.save()
		user.recipes = user.recipes.concat(savedRecipe._id)
		await user.save()
		response.status(201).json(savedRecipe)
	} catch(error) {
		next(error)
	}
})

recipesRouter.delete('/:id', async (request, response, next) => {
	const idToDelete = Number(request.params.id)
	try {
		const deletedRecipe = await Recipes.findOneAndDelete({ id: idToDelete })

		if (deletedRecipe) {
			response.status(204).end() // Recipe found and deleted successfully
		} else {
			response.status(404).json({ message: 'Recipe not found' }) // Recipe not found (null value)
		}
	} catch (error) { // Promise is rejected - 400: request not understood by the server
		console.error('Error finding and deleting recipe:', error)
		next(error)
	}
})

module.exports = recipesRouter