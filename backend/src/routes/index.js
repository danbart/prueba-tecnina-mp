const express = require('express');
const casosRoutes = require('./casos.routes');
const authRoutes = require('./auth.routes');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/casos', auth, casosRoutes);

module.exports = router;