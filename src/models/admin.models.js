const mongoose = require("mongoose")
const AdminSchema = new mongoose.Schema({
    password: String,
    email: { type: String, unique: true },
    role: { type: String, default: "admin" },
    token: { type: String }
}, {
    versionKey: false,
})
module.exports = mongoose.model("Admin", AdminSchema);