const express = require('express');
const cors = require('cors');
const casosRoutes = require('./routes/casos.routes');
const authRoutes = require('./auth.routes');
const auth = require('../middlewares/auth');
require('dotenv').config();

console.log('Vars:', process.env.DB_USER, process.env.DB_SERVER, process.env.DB_NAME, process.env.DB_PASSWORD, process.env.DB_PORT);
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes'));

app.get('/', (req, res) => {
    res.send('API del Ministerio Público en funcionamiento.');
});

module.exports = app;
