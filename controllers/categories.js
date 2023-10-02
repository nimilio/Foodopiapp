const categoriesRouter = require('express').Router()
const Recipes = require('../models/recipe')

// get recipes by category
const getRecipesByCategory = async (category, response, next) => {
	try {
		const recipes = await Recipes.find({ category })
		if (recipes.length === 0) {
			const notFoundError = new Error(`No ${category.toLowerCase()} recipes found`)
			notFoundError.name = 'NotFoundError'
			throw notFoundError
		}
		response.json(recipes)
	} catch (error) {
		next(error)
	}
}

const categories = ['Pie', 'Cake', 'Bread', 'Salad', 'Dessert', 'Drink', 'Pizza', 'Meat', 'Miscellaneous', 'Cookie', 'Tart']

// create routes for each category
categories.forEach((category) => {
	const routePath = `/${category.toLowerCase()}s`

	categoriesRouter.get(routePath, async (request, response, next) => {
		await getRecipesByCategory(category, response, next)
	})
})


module.exports = categoriesRouter
