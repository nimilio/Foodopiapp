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

	// Check if a recipe with the same name already exists
	const existingRecipe = await Recipes.findOne({ name: body.name, user: user.id })

	if (existingRecipe) {
		return response.status(400).json({ error: 'Recipe with the same name already exists' })
	}

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

recipesRouter.put('/myrecipes/:name', async (request, response, next) => {
	const body = request.body
	const recipeName = request.params.name
	const recipe = await Recipes.findOne({ name: recipeName })

	if ( recipe ) {
		const recipeUpdate = {
			name: body.name,
			category: body.category,
			ingredients: body.ingredients,
			method: body.method,
			author: body.author,
			url: body.url
		}

		try {
			const updatedRecipe = await Recipes.findOneAndUpdate({ name: recipeName }, recipeUpdate, { new: true })

			if (updatedRecipe) {
				response.status(204).end()
			}
		} catch (error) {
			console.error('Error finding and updating recipe:', error)
			next(error)
		}
	}else {
		return response.status(401).json({ error: 'Recipe not found' })
	}
})

recipesRouter.delete('/myrecipes/:name', async (request, response, next) => {
	const nameToDelete = request.params.name
	try {
		const deletedRecipe = await Recipes.findOneAndDelete({ name: nameToDelete })

		if (deletedRecipe) {
			response.status(204).end()
		} else {
			response.status(404).json({ message: 'Recipe not found' })
		}
	} catch (error) { // rejected promise 400
		console.error('Error finding and deleting recipe:', error)
		next(error)
	}
})

module.exports = recipesRouter