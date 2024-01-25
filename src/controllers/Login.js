const { errorResMsg, successResMsg } = require("../library/ErrorHandler")
const userSchema = require("../models/User")
const bcrypt = require("bcryptjs")
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userSchema.findOne({ email })
        if (!user) {
            return errorResMsg(res, 400, "User not found")
        }
        if (user.isverified === false) {
            return errorResMsg(res, 400, "User not Found")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return errorResMsg(res, 400, "Your email or password does not match")
        }
        
        return successResMsg(res, 200, { message: "Login successful", user })
    } catch (error) {
        console.log(error.message);
        return errorResMsg(res, 400, "Error logging in")
    }
}

module.exports = Login;