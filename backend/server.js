const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 3000

//Connect to mongodb

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

//Routes
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`listen on port ${PORT}`)
})