const User = require("../models/User")
const Verify = async (req, res) => {
    try {
        const { otp } = req.body
        const user = await User.findOne({otp})
        if (!user) {
            return res.status(400).json({ message: "INVALID OTP" });
        }
        // change isverified to true when i input the otp
        user.isverified = true
        await user.save()
        res.status(200).json({ message: "User Verified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = Verify


