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
		// find recipes where 'visible' does not exist or is false
		const recipes = await Recipes.find({
			$or: [
				{ visible: { $exists: false } },
				{ visible: false }
			]
		}).populate('user', { username: 1 })
		response.json(recipes)
	} catch (error) {
		console.error('Error fetching recipes from the database:', error)
		next(error)
	}
})

recipesRouter.get('/myrecipes', async (request, response, next) => {
	try {
		const username = request.query.username
		const recipes = await Recipes.find({}) 
			.populate('user', { username: 1 })

		// Filter the recipes by the provided username
		const userRecipes = recipes.filter(recipe => recipe.user && recipe.user.username === username)
		response.json(userRecipes)
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
		category: body.category,
		ingredients: body.ingredients,
		method: body.method,
		author: body.author,
		url: body.url,
		user: user.id,
		visible: body.visible,
		username: body.username
	})

	try {
		const savedRecipe = await recipe.save()
		// store recipe id in the recipes field
		user.recipes = user.recipes.concat(savedRecipe._id)
		await user.save()
		response.status(200).json({ message: 'Recipe created!' })
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