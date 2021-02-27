require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const mainRoutes = require("./src/routes");

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/', mainRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});