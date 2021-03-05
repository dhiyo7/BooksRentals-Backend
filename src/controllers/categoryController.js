const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const form = require("../helpers/form");
const fs = require("fs");

module.exports = {
  getAllCategories: (req, res) => {
    prisma.categories
      .findMany({
        include: { books: true },
      })
      .then((data) => {
        form.success(res, 200, data);
      })
      .catch((err) => {
        console.log(err);
        form.error(res, 500, err);
      });
  },

  postCategory: (req, res) => {
    const { body } = req;

    const newBody = {
      ...body,
      category_image: req.file.path,
    };

    prisma.categories
      .create({
        data: newBody,
      })
      .then((data) => {
        form.success(res, 200, data);
      })
      .catch((err) => {
        form.error(res, 500, err);
      });
  },

  updateCategory: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    prisma.categories
      .findUnique({
        where: {
          id: parseInt(id),
        },
      })
      .then((data) => {
        if (!data) {
          form.error(res, 404, "Data not available");
        } else {
          const newBody = {
            ...body,
            category_image:
              req.file !== undefined ? req.file.path : data.category_image,
          };

          if (fs.existsSync(data.category_image)) {
            fs.unlink(data.category_image, (err) => {
              if (err) throw err;
              console.log("Photo kehapus");
            });
          }

          prisma.categories
            .update({
              data: newBody,
              where: {
                id: parseInt(id),
              },
            })
            .then((data) => {
              form.success(res, 200, data);
            })
            .catch((err) => {
              form.error(res, 500, err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        form.error(res, 500, err);
      });
  },
};
