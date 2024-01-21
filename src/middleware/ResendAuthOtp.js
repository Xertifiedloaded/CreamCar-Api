const { successResMsg, errorResMsg } = require("../library/ErrorHandler");
const User = require("../models/User");
const sendOtpThroughEmail = require("../services/ResendOtpEmail");
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
            console.log("New OTP  will be deleted after 4 minutes.");
        }, 240000);
        const receipientEmail = email
        sendOtpThroughEmail(receipientEmail, newOtp)
        successResMsg(res, 200, { message: "Error resending OTP", error })
    } catch (error) {
        errorResMsg(res, 500, "Error resending OTP")
    }
}
module.exports = ResendOTP