const mongoose = require("mongoose")
const CarModel = new mongoose.Schema({
    image: String,
    title: String,
    content: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
    timeStamp: { type: Date, default: Date.now }
})
module.exports = mongoose.model("Car", CarModel)