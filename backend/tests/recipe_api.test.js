const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Recipes = require('../models/recipe')

const initialRecipes = [
	{
		'Name': 'Christmas pie',
		'url': 'https://www.bbcgoodfood.com/recipes/2793/christmas-pie',
		'Description': 'Combine a few key Christmas flavours here to make a pie that both children and adults will adore',
		'Author': 'Mary Cadogan',
		'Ingredients': [
			'2 tbsp olive oil',
			'knob butter',
			'1 onion, finely chopped',
			'500g sausagemeat or skinned sausages',
			'grated zest of 1 lemon',
			'100g fresh white breadcrumbs',
			'85g ready-to-eat dried apricots, chopped',
			'50g chestnut, canned or vacuum-packed, chopped',
			'2 tsp chopped fresh or 1tsp dried thyme',
			'100g cranberries, fresh or frozen',
			'500g boneless, skinless chicken breasts',
			'500g pack ready-made shortcrust pastry',
			'beaten egg, to glaze'
		],
		'Category': 'Pie',
		'Method': [
			'Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.',
			'Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.',
			'Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.',
			'Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.',
			'Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.'
		],
		'id': 1
	},
	{
		'Name': 'Simmer-&-stir Christmas cake',
		'url': 'https://www.bbcgoodfood.com/recipes/1160/simmerandstir-christmas-cake',
		'Description': 'An easy-to-make alternative to traditional Christmas cakes which requires no beating',
		'Author': 'Mary Cadogan',
		'Ingredients': [
			'175g butter, chopped',
			'200g dark muscovado sugar',
			'750g luxury mixed dried fruit (one that includes mixed peel and glac\u00e9 cherries)',
			'finely grated zest and juice of 1 orange',
			'finely grated zest of 1 lemon',
			'100ml/3\u00bd fl oz cherry brandy or brandy plus 4tbsp more',
			'85g macadamia nut',
			'3 large eggs, lightly beaten',
			'85g ground almond',
			'200g plain flour',
			'\u00bd tsp baking powder',
			'1 tsp ground mixed spice',
			'1 tsp ground cinnamon',
			'\u00bc tsp ground allspice'
		],
		'Method': [
			'Put the butter, sugar, fruit, zests, juice and 100ml/3\u00bdfl oz brandy in a large pan. Bring slowly to the boil, stirring until the butter has melted. Reduce the heat and bubble for 10 minutes, stirring occasionally.',
			'Remove the pan from the heat and leave to cool for 30 minutes.',
			'Meanwhile, preheat the oven to 150C/gas 2/ fan 130C and line a 20cm round cake tin. Toast the nuts in a dry frying pan, tossing them until evenly browned, or in the oven for 8-10 minutes - keep an eye on them as they burn easily. When they are cool, chop roughly. Stir the eggs, nuts and ground almonds into the fruit mixture and mix well. Sift the flour, baking powder and spices into the pan. Stir in gently, until there are no traces of flour left.',
			'Spoon the mixture into the tin and smooth it down evenly - you will find this is easiest with the back of a metal spoon which has been dipped into boiling water.',
			'Bake for 45 minutes, then turn down the heat to 140C/gas 1/ fan120C and cook for a further 1-1\u00bc hours (about a further 1\u00be hours if you have a gas oven) until the cake is dark golden in appearance and firm to the touch. Cover the top of the cake with foil if it starts to darken too much. To check the cake is done, insert a fine skewer into the centre - if it comes out clean, the cake is cooked.',
			'Make holes all over the warm cake with a fine skewer and spoon the extra 4tbsp brandy over the holes until it has all soaked in. Leave the cake to cool in the tin. When it\'s cold, remove it from the tin, peel off the lining paper, then wrap first in baking parchment and then in foil. The cake will keep in a cupboard for up to three months or you can freeze it for six months.'
		],
		'id': 2
	}]


// initialie the database before every test so that it is in the same state before every test is run
beforeEach(async () => {
	await Recipes.deleteMany({})
	console.log('recipes deleted')

	const recipeObjects = initialRecipes
		.map(recipe => new Recipes(recipe))
	// create an array of promises, call save method for each item
	const promiseArray = recipeObjects.map(recipe => recipe.save())
	await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
	await api
	// make Get request
		.get('/api/recipes')
	// verify that the requests responds with status 200
		.expect(200)
	// verify that data is in desired format with a regular expression
		.expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
	const response = await api.get('/api/recipes')
	// by using the await syntax the
	// execution gets here only after the HTTP request is complete
	// the result of HTTP request is saved in variable response
	expect(response.body).toHaveLength(2)
})

test('the first recipe is a pie recipe', async () => {
	const response = await api.get('/api/recipes')
	// create an array containing the content of every note returned by the API
	const contents = response.body.map(r => r.Name)
	// toContain method is used for checking that the note given as parameter is in the list of notes returned by the API
	expect(contents[0]).toContain(
		'pie'
	)
})

// add new recipe and verify that number of notes increases
test('a valid recipe can be added ', async () => {
	const newRecipe = {
		'Name': 'Christmas cupcakes',
		'url': 'https://www.bbcgoodfood.com/recipes/72622/christmas-cupcakes',
		'Description': 'These beautiful and classy little cakes make lovely gifts, and kids will enjoy decorating them too',
		'Author': 'Sara Buenfeld',
		'Ingredients': [
			'200g dark muscovado sugar',
			'175g butter, chopped',
			'700g luxury mixed dried fruit',
			'50g glac\u00e9 cherries',
			'2 tsp grated fresh root ginger',
			'zest and juice 1 orange',
			'100ml dark rum, brandy or orange juice',
			'85g/3oz pecannuts, roughly chopped',
			'3 large eggs, beaten',
			'85g ground almond',
			'200g plain flour',
			'\u00bd tsp baking powder',
			'1 tsp mixed spice',
			'1 tsp cinnamon',
			'400g pack ready-rolled marzipan(we used Dr Oetker)',
			'4 tbsp warm apricotjam or shredless marmalade',
			'500g pack fondant icingsugar',
			'icing sugar, for dusting',
			'6 gold and 6 silver muffincases',
			'6 gold and 6 silver sugared almonds',
			'snowflake sprinkles'
		],
		'Method': [
			'Tip the sugar, butter, dried fruit, whole cherries, ginger, orange zest and juice into a large pan. Pour over the rum, brandy or juice, then put on the heat and slowly bring to the boil, stirring frequently to melt the butter. Reduce the heat and bubble gently, uncovered for 10 mins, stirring every now and again to make sure the mixture doesn\u2019t catch on the bottom of the pan. Set aside for 30 mins to cool.',
			'Stir the nuts, eggs and ground almonds into the fruit, then sift in the flour, baking powder and spices. Stir everything together gently but thoroughly. Your batter is ready.',
			'Heat oven to 150C/130C fan/gas 2. Scoop the cake mix into 12 deep muffin cases (an ice-cream scoop works well), then level tops with a spoon dipped in hot water. Bake for 35-45 mins until golden and just firm to touch. A skewer inserted should come out clean. Cool on a wire rack.',
			'Unravel the marzipan onto a work surface lightly dusted with icing sugar. Stamp out 12 rounds, 6cm across. Brush the cake tops with apricot jam, top with a marzipan round and press down lightly.',
			'Make up the fondant icing to a spreading consistency, then swirl on top of each cupcake. Decorate with sugared almonds and snowflakes, then leave to set. Will keep in a tin for 3 weeks.'
		],
		'id': 3
	}

	await api
		.post('/api/recipes')
		.send(newRecipe)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/recipes')

	const names = response.body.map(n => n.Name)
	expect(response.body).toHaveLength(initialRecipes.length + 1)
	expect(names).toContain(
		'Christmas cupcakes'
	)
})

// recipes without name are not saved in the database
test('recipe without name is not added', async () => {
	const newRecipe = {
		Category: "pizza"
	}

	await api
		.post('/api/recipes')
		.send(newRecipe)
		.expect(400)

    const response = await api.get('/api/recipes')

    expect(response.body).toHaveLength(initialRecipes.length)
}, 80000)

// close the db connection  when all tests are finished
afterAll(async () => {
	await mongoose.connection.close()
})