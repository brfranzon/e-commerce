let mongoose = require("mongoose");

//Product Schema
let ProductSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    slug: {
        type: String
    },
    desc: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("products", ProductSchema);