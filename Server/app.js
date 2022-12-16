const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const product = require("./routes/productRoute");
const farmer = require("./routes/farmerRoutes");
const customer = require("./routes/customerRoutes");
app.use("/api/v1",product);
app.use("/api/v1",farmer);
app.use("/api/v1",customer);

app.use(errorMiddleware);

module.exports = app