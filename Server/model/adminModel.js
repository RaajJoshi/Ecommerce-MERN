const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false,
    },
    phoneno:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    role:{
        type:String
    },
});

// bcrypt Password
adminSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    
    this.password = await bcrypt.hash(this.password,10);

});

// JWT Token
adminSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

module.exports = mongoose.model("Admin",adminSchema);