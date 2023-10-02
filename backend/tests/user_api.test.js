
const User = require('../models/user')

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

test('username created', async () => {
	const initialUsers = await usersInDb()

	const newUser = {
		username: 'newUser',
		name: 'New User',
		password: '12345'
	}

	await api
		.post('/api/users')
		.send(newUser)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const addedUsers = await usersInDb()
	expect(addedUsers).toHaveLength(initialUsers.length + 1)

	const usernames = addedUsers.map(u => u.username)
	expect(usernames).toContain(newUser.username)
},100000)


test('creation fails with proper statuscode and message if username already taken', async () => {
	const usersAtStart = await usersInDb()

	const newUser = {
		username: 'root',
		name: 'Superuser',
		password: 'salainen',
	}

	const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	expect(result.body.error).toContain('expected `username` to be unique')

	const usersAtEnd = await usersInDb()
	expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
