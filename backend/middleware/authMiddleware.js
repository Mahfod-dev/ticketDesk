const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protectToken = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		try {
			//get token$
			token = req.headers.authorization.split(' ')[1]

			//verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error('Not authorization')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorization')
	}
})

module.exports = { protectToken }
