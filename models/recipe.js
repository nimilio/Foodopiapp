// mongoose schema

const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	url: String,
	author: String,
	ingredients: Array,
	category: String,
	method: Array,
	// the recipe has an array of references to users who saved it
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

recipeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Recipe', recipeSchema)
