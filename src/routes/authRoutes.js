const authRoutes = require('express').Router();
const authController = require('../controllers/authControllers');

authRoutes.post('/sign-up', authController.signUp);
authRoutes.post('/sign-in', authController.signIn);

module.exports = authRoutes;