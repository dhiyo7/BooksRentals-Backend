const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const form = require("../helpers/form");

module.exports = {
  getBooks: (req, res) => {
    prisma.books
      .findMany()
      .then((data) => {
        form.success(res, 200, data);
      })
      .catch((error) => {
        form.error(res, 500, error);
      });
  },
  postBooks: (req, res) => {
    prisma.books
      .create({data: req.body})
      .then((data) => {
        form.success(res, 200, data);
      })
      .catch((error) => {
        form.error(res, 500, error);
      });
  },
};
