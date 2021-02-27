const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: (req, res) => {
    const { body } = req;
    const saltRounds = 10;

    console.log("Salt Round ", saltRounds);
    bcrypt.hash(body.password, saltRounds, (err, hashPassword) => {
      const newBody = {
        ...body,
        password: hashPassword,
      };

      prisma.users
        .create({
          data: newBody,
        })
        .then((data) => {
          res.send({
            msg: "Success Sign Up",
            status: 200,
            data: data,
          });
        })
        .catch((error) => {
          res.send({
            msg: "Error Sign Up",
            status: 500,
            error: error,
          });
        });
    });
  },

  signIn: (req, res) => {
    const { body } = req;
    prisma.users
      .findFirst({
        where: {
          email: body.email,
        },
      })
      .then((data) => {
        if (!data) {
          res.send({
            msg: "Error Login, User not found",
            status: 404,
          });
        } else {
          const isValid = bcrypt.compareSync(body.password, data.password);
          console.log(isValid);
          if (!isValid) {
            res.send({
              msg: "Error Login",
              status: 403,
              error: "Password is wrong",
            });
          } else {
            //membuat payload
            const payload = {
                id: data.id,
              name: data.name,
              username: data.username,
              email: data.email,
            };

            const token = jwt.sign(payload, "PowerRanger", {
              expiresIn: 86400, //seconds
            });

            delete data.password;

            const newData = {
              ...data,
              token: token,
            };

            res.send({
              msg: "Success Login",
              status: 200,
              data: newData,
            });
          }
        }
      })
      .catch((error) => {
        res.send({
          msg: "Error login",
          status: 500,
          error: error,
        });
      });
  },
};
