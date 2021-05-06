const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { mongoose } = require('./database');
require('./middlewares/auth');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('start'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
app.use('/api', require('./routes/api-routes'));

// Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`);
});