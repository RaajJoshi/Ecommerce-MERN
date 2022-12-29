const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    category:{
        type:String,
        required:[true,"Plaese enter category"]
    },
    name:{
        type:String,
        required:[true,"Plaese enter name"]
    },
    description:{
        type:String,
        required:[true,"Plese enter description"]
    },
    quantity:{
        type:String,
        required:[true,"Please enter quantity"]
    },
    price:{
        type:String,
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
        ref:"User",
        required:true,
    }
})

module.exports = mongoose.model("Product",productSchema);