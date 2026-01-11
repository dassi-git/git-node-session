const { type } = require("express/lib/response")
const mongoose=require("mongoose")
const productScema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
         price:{
        type:Number,
        required:true,
    },
    body:{
        type:String
    },
    productExist:{
        type:String,
        enum: ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"],
        default:"INSTOCK",
    },
    image:{
        type:String,
      
        
    }
   
    }
)
module.exports = mongoose.model("Product", productScema)
