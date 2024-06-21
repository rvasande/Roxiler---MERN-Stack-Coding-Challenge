const express = require("express");
const productRoute = require("./routes/productRoute");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/api/v1/products", productRoute);



module.exports = app;
