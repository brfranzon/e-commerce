let mongoose = require("mongoose");

//Category Schema

let CategorySchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    slug: {
        type: String
    }
});

module.exports = mongoose.model("categories", CategorySchema);