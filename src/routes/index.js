const mainRoutes = require('express').Router();

const welcomeRoutes = require('./welcomeRoutes')
const bookRoutes = require('./bookRoutes');
const categoryRoutes = require('./categoryRoutes');
const authRoutes = require('./authRoutes');

mainRoutes.use('/', welcomeRoutes);
mainRoutes.use('/auth', authRoutes);
mainRoutes.use('/books', bookRoutes);
mainRoutes.use('/categories', categoryRoutes);

module.exports = mainRoutes;