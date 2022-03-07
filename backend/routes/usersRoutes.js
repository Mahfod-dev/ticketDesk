const express = require('express')
const router = express.Router()

const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController')

const { protectToken } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protectToken, getMe)

module.exports = router
