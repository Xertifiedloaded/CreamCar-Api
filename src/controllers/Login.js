const userSchema = require("../models/User")
const bcrypt = require("bcrypt")
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.isverified === false) {
            return res.status(400).json({ message: "user not verified" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Your email or password does not match" })
        }
        res.status(200).json({ message: "Login successful", user: user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error });
    }
}

module.exports=Login;