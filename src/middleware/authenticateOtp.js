const { errorResMsg, successResMsg } = require("../library/ErrorHandler")
const User = require("../models/User")
const Verify = async (req, res) => {
    try {
        const { otp } = req.body
        const user = await User.findOne({ otp })
        if (!user) {
            return errorResMsg(res, 400, "INVALID OTP")
        }

        user.isverified = true
        await user.save()
        successResMsg(res, 200, { message: "User Verified", user })
    } catch (error) {
        console.error(error);
        errorResMsg(res,500,"Internal Server Error")
    }

}
module.exports = Verify


