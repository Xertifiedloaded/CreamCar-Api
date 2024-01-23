const bcrypt = require("bcryptjs")
const User = require("../models/User");
const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return errorResMsg(res, 200, "Password Does not match")
        }
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() },
        })
        if (!user) {
            return errorResMsg(res, 400, "Invalid or expired reset token")
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
        return successResMsg(res, 200, { message: "Password Reset Succesfull1y", user })
    } catch (error) {
        errorResMsg(res, 500, "Error Resetting Password")
    }
}
module.exports = ResetPassword