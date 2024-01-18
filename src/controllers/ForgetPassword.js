const User = require("../models/User.js")
const uuid = require("uuid");
const SendResetPasswordLink = require("../services/ResetPasswordLink.js");
const ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const resetToken = uuid.v4();
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 10);
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();
        const receiverEmail = email
        SendResetPasswordLink(receiverEmail, resetToken, PORT)
        res.status(200).json({ message: "Reset link successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error Sending Reset Link", error });

    }
}
module.exports = ForgetPassword