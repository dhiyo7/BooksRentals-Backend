const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const form = require("../helpers/form");

module.exports = {
  getBooks: (req, res) => {
    prisma.books
      .findMany()
      .then((data) => {
        form.success(res,"Success Get All Books", 200, data);
      })
      .catch((error) => {
        form.error(res, 500, error);
      });
  },
  postBooks: (req, res) => {
    console.log("DATA BUKU ", req.body);
    prisma.books
      .create({data: req.body})
      .then((data) => {
        form.success(res, "Success Create New Book", 200, data);
      })
      .catch((error) => {
        form.error(res, 500, error);
      });
  },
};
