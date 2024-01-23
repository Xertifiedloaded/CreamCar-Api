const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateOTP = require("./OtpCodeGenerator")
const sendEmail = require("../services/SendEmail")
const Token = require("../services/Jwt");
const { errorResMsg } = require("../library/ErrorHandler");
const Signup = async (req, res) => {
    const len = 4
    const otp = generateOTP(len)
    console.log(otp)
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return errorResMsg(res, 500, "Please input username, password and email")
        }
        const ExistingUser = await User.findOne({ email });
        if (ExistingUser){
            return errorResMsg(res, 400, "user already exist")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, otp });
        await newUser.save()
        const receiverEmail = email;
        sendEmail(receiverEmail, otp)
        Token(newUser, res)
    } catch (error) {
        return errorResMsg(res, 500, "Error creating user")
    }
};
module.exports = Signup