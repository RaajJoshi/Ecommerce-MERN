const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
//const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended : true }));
//app.use(fileUpload);

const product = require("./routes/productRoute");
const farmer = require("./routes/farmerRoutes");
const customer = require("./routes/customerRoutes");
const order = require('./routes/orderRoutes');
const admin = require("./routes/adminRoutes");
//const user = require("./routes/userRoutes");

app.use("/api/v1",product);
app.use("/api/v1",farmer);
app.use("/api/v1",customer);
app.use("/api/v1",order);
app.use("/api/v1",admin);
//app.use("/api/v1",user);

app.get('/',(req,res)=>{
    res.send(`Hello wolrd from node`);
});

app.use(errorMiddleware);

module.exports = app