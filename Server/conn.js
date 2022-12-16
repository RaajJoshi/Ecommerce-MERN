const mongoose = require("mongoose");

const connectDatabase =()=>{
    mongoose.connect(process.env.DB,{useNewUrlParser:true}).then((data)=>{
        console.log(`Connection Successfull with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`Error in Connection`);
    })
}

module.exports= connectDatabase