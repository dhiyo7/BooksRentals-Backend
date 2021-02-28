const welcomeRoutes = require('express').Router()

welcomeRoutes.get("/", (_, res) => {
    const resObject = {
      message: "Welcome to Books Collection API",
      status: 200,
      author: 'Dhiya Reksa Kusumojati Brameswanto',
      repository: 'https://github.com/dhiyo7/BooksRentals-Backend'
    }
    res.status(200).json(resObject);
  });
  
  module.exports = welcomeRoutes;