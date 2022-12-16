const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plaese enter name"]
    },
    quantity:{
        type:Number,
        required:[true,"Please enter quantity"]
    },
    price:{
        type:Number,
        required:[true,"Please enter price"]
    },
    ratings:{
        type:Number,
    },
    numOfReviews:{
        type:String,
    },
    reviews:[
        {
            uname:{
                type:String,
                required:true,
            },
            uid:{
                type:mongoose.Schema.ObjectId,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    farmer:{
        type:mongoose.Schema.ObjectId,
        ref:"Farmer",
        required:true,
    }
})

module.exports = mongoose.model("Product",productSchema);