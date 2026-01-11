const mongoose = require("mongoose")
const { type } = require("express/lib/response")
const basketScema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,

    },
    Products: [{
        type: {
            type: mongoose.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]

})
module.exports = mongoose.model("basket", basketScema)