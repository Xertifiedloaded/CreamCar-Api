const User = require("../models/User.js")
const uuid = require("uuid");
const SendResetPasswordLink = require("../services/ResetPasswordLink.js");
const { successResMsg, errorResMsg } = require("../library/ErrorHandler.js");
const ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return errorResMsg(res, 400, "User not found")
        }
        const resetToken = uuid.v4();
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 10);
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();
        const receiverEmail = email
        SendResetPasswordLink(receiverEmail, resetToken, PORT)
        return successResMsg(res, 200, { message: "Reset link successfully", user })
    } catch (error) {
        errorResMsg(res, 500, "Error Sending Reset Link")
    }
}
module.exports = ForgetPassword