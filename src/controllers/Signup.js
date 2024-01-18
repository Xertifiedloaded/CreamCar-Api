const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateOTP  = require("./OtpCodeGenerator")
const Signup = async (req, res) => {
    // otp
    const len = 4
    const otp = generateOTP(len)
    console.log(otp)
    // generate otp before user csn signaIn //
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res
                .status(400)
                .json({ message: "Please input username, password and email" });
        }
        const ExistingUser = await User.findOne({ email });
        if (ExistingUser) {
            return res.status(400).json({ message: "user already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, otp });
        await newUser.save()
        res.status(201).json({
            message: "Details user created successfully creates",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error });
    }
};

module.exports = Signup