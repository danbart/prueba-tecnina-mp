const express = require('express');
const casosRoutes = require('./casos.routes');
const authRoutes = require('./auth.routes');
const auth = require('../middlewares/auth');
const userRoutes = require('./user.routes'); // Assuming you have a user.routes.js file

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/casos', auth, casosRoutes);
router.use('/users', auth, userRoutes);

module.exports = router;