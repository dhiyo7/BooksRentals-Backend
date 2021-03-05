const categoryRoutes = require("express").Router();
const categoryController = require("../controllers/categoryController");
const uploadSingle = require("../helpers/uploadMiddleware");

categoryRoutes.get("/", categoryController.getAllCategories);
categoryRoutes.post("/", uploadSingle, categoryController.postCategory);
categoryRoutes.put("/:id", uploadSingle, categoryController.updateCategory);

module.exports = categoryRoutes;
