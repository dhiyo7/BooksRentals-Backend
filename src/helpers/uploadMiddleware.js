const multer = require("multer");
const path = require("path");
const form = require("./form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const nameFormat = `PLUGIN-${Date.now()}-${file.fieldname}${path.extname(
      file.original
    )}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: 5 * 1024 * 1024,
});

const singleUpload = (req, res, next) => {
  const uploadSingle = upload.single("image");
  uploadSingle(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer Error",
        error: err,
      });
    } else {
      next();
    }
  });
};

module.exports = singleUpload;
