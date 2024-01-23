const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    password: String,
    email: { type: String, unique: true },
    otp: String,
    resetToken: String,
    profilePic: String,
    resetTokenExpiry: String,
    // isverified: { type: Boolean, default: false },
    // role: { type: String, default: "user" },
},
    {
        versionKey: false,
    }
)
const UserCredential = mongoose.model('User', userSchema)
module.exports = UserCredential