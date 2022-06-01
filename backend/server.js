const express = require('express');

require('colors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

//Connect to mongodb

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

//Routes
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/tickets', require('./routes/ticketsRoute'));
app.use('/api/tickets/:id', require('./routes/ticketsRoute'));

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
