const res = require("express/lib/response");
const ErrorHandler = require("../utls/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || "Error"

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}