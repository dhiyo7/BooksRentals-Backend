require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 7007

const mainRoutes = require("./src/routes");

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(express.static("public"));

app.use('/', mainRoutes);
// Handle all 404 responses
app.use(function (req, res) {
  res.status(404).json({
    msg: "Data Not Found",
    status: 404,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});