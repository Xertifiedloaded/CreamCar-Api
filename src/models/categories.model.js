const mongoose = require("mongoose");

const categories = new mongoose.Schema({
    picture: String,
    content: String,
    paragraph: String
})





module.exports = mongoose.model("categories", categories)
