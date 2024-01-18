const User = require("../models/User")
const ResendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        user.otp = newOtp
        await user.save();
        setTimeout(async () => {
            user.otp = undefined;
            await user.save();
            console.log("New OTP deleted after 4 minutes.");
        }, 240000);
        res.status(200).json({ message: "OTP resent successfully kindly check your mail", user });
    } catch (error) {
        res.status(500).json({ message: "Error resending OTP", error });
    }
}
module.exports = ResendOTP