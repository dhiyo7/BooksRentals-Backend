const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getBooks: (req, res) => {
    console.log(req);
    prisma.books
      .findMany()
      .then((data) => {
        res.send({
          msg: "Success",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          msg: "Error",
          status: 500,
          error: error 
        });
      });
  },
};
