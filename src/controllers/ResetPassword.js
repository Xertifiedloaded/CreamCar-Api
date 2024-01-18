const bcrypt = require("bcrypt")
const User = require("../models/User")
const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password Does Not Match" });
        }
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() },
        })
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired reset token" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
        res.status(200).json({ message: "Password Reset Succesfull1y", user });
    } catch (error) {
        res.status(500).json({ message: "Error Resetting Password", error });
    }
}
module.exports = ResetPassword