const express = require('express');
const cors = require('cors');
const casosRoutes = require('./routes/casos.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/casos', casosRoutes);

app.get('/', (req, res) => {
    res.send('API del Ministerio Público en funcionamiento.');
});

module.exports = app;
