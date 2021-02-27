const mainRoutes = require('express').Router();

const bookRoutes = require('./bookRoutes');
const authRoutes = require('./authRoutes');

mainRoutes.use('/auth', authRoutes);
mainRoutes.use('/books', bookRoutes);

module.exports = mainRoutes;