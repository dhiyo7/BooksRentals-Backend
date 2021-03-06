const bookRoutes = require('express').Router();
const bookControllers = require('../controllers/bookControllers')
const authMiddleware = require('../helpers/authMiddleware');

bookRoutes.get('/',  authMiddleware.checkLogin, bookControllers.getBooks);
bookRoutes.post('/',  authMiddleware.checkLogin, bookControllers.postBooks);

module.exports = bookRoutes;