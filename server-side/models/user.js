const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
	userId: { type: Number },
	gender: { type: String },
	name: {
		type: {
			title: { type: String },	
			first: { type: String },
			last: { type: String },
		},
	},
	location: {
		type: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			postcode: { type: String },
			coordinates: {
				type: {
					latitude: { type: String },
					longitude: { type: String },
				},
			},
			timezone: {
				type: {
					offset: { type: String },
					description: { type: String },
				},
			},
		},
	},
	email: { type: String },
	login: {
		type: {
			uuid: { type: String },
			username: { type: String },
			password: { type: String },
			salt: { type: String },
			md5: { type: String },
			sha1: { type: String },
			sha256: { type: String },
		},
	},
	dob: {
		type: {
			date: { type: String },
			age: { type: Number },
		},
	},
	registered: {
		type: {
			date: { type: String },
			age: { type: Number },
		},
	},
	phone: { type: String },
	cell: { type: String },
	id: {
		type: {
			name: { type: String },
			value: { type: String, default: null },
		},
	},
	picture: {
		type: {
			large: { type: String },
			medium: { type: String },
			thumbnail: { type: String },
		},
	},
	nat: { type: String },
})

module.exports.Users = mongoose.model('Users', userSchema)
