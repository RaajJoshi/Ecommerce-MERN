const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const farmerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plaese enter Name"]
    },
    email:{
        type:String,
        required:[true,"Please enter Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter Password"],
        minlength:[8,"Password must be atleast 8 characters"],
        select:false
    },
    phoneno:{
        type:Number,
        required:[true,"Please enter Phone No."],
        minlength:[10,"Password must be 10 digits"],
        maxlength:[10,"Password must be 10 digits"],
    },
    city:{
        type:String,
        required:[true,"Please enter City"],
    },
    role:{
        type:String
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

// bcrypt Password
farmerSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    
    this.password = await bcrypt.hash(this.password,10);

});

// JWT Token
farmerSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//Compare Password
// farmerSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password);
// }

module.exports = mongoose.model("Farmer",farmerSchema);