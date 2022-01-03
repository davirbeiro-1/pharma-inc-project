const app = require('../index')
const request = require('supertest')
const faker = require('faker')
const ServerApi = require('../service/server')

const createApp = async () => {
	const service = new ServerApi()
	await service.configureRestService()
	return service
}

describe('Testing Users Routes', () => {
	let service, app
	beforeAll(async () => {
		service = await createApp()
		app = service.getApp()
	})

	test('Must return 400 when try to get a nonexistent user by id.', async () => {
		const userId = 'zzz'
		const response = await request(app).get(`/v1/users/${userId}`)
		expect(response.statusCode).toBe(400)
	})

	test('Must return 200 when try to get an existing user by id.', async () => {
		const userId = Math.floor(Math.random() * 500) + 1
		const response = await request(app).get(`/v1/users/${userId}`)
		expect(response.statusCode).toBe(200)
	})

	test('Must return 400 when try to update a nonexistent user by id.', async () => {
		const userId = '165498461'
		const newData = {
			name: {
				title: faker.name.title,
				first: faker.name.first,
				last: faker.name.last,
			},
			location: {
				street: {
					name: faker.address.streetName,
					number: faker.address.zipCode,
				},
				city: faker.address.cityName,
				country: faker.address.county,
				state: faker.address.state,
			},
			gender: faker.name.gender,
			phone: faker.phone.phoneNumber,
			email: faker.internet.email,
			nat: faker.address.countryCode,
			dob: { age: 10, date: '2011-11-11T02:00:00.000Z' },
		}
		const response = await request(app).put(`/v1/users/${userId}`).send(newData)
		expect(response.statusCode).toBe(400)
	})

	test('Must return 200 when try to update an existing user by id.', async () => {
		const userId = Math.floor(Math.random() * 500) + 1
		const newData = {
			name: {
				title: faker.name.title,
				first: faker.name.first,
				last: faker.name.last,
			},
			location: {
				street: {
					name: faker.address.streetName,
					number: faker.address.zipCode,
				},
				city: faker.address.cityName,
				country: faker.address.county,
				state: faker.address.state,
			},
			gender: faker.name.gender,
			phone: faker.phone.phoneNumber,
			email: faker.internet.email,
			nat: faker.address.countryCode,
			dob: { age: 10, date: '2011-11-11T02:00:00.000Z' },
		}
		const response = await request(app).put(`/v1/users/${userId}`).send(newData)
		expect(response.statusCode).toBe(200)
	})

	test('Must return 400 when try to delete a nonexistent user by id.', async () => {
		const userId = '165498461'
		const response = await request(app).delete(`/v1/users/${userId}`)
		expect(response.statusCode).toBe(400)
	})

	test('Must return 200 when try to delete an existing user by id.', async () => {
		const userId = Math.floor(Math.random() * 500) + 1
		const response = await request(app).delete(`/v1/users/${userId}`)
		expect(response.statusCode).toBe(200)
	})
})
