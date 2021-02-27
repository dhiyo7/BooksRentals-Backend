module.exports = {
  success: (res, status, data) => {
    res.status(status).send({
      message: "Success",
      status,
      data,
    });
  },
  error: (err, status, data) => {
    res.status(status).send({
      message: "Error Network",
      status,
      err,
    });
  },
};
