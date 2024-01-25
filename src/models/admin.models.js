const mongoose = require("mongoose")
const AdminSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    password: String,
    phoneNumber:String,
    email: { type: String, unique: true },
    role: { type: String, default: "admin" },
    token: { type: String }
}, {
    versionKey: false,
})
module.exports = mongoose.model("Admin", AdminSchema);
