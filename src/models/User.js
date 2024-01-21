const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    password: String,
    email: String,
    otp: String,
    resetToken: String,
    ProfilePicture: String,
    resetTokenExpiry: String,
    isverified: String
})
const UserCredential = mongoose.model('User', userSchema)
module.exports = UserCredential