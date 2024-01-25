const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
const Admin = require("../models/admin.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.AdminSignUp = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return errorResMsg(res, 403, "Admin Already Exist")
        }
        if (!email || !password) {
            return errorResMsg(res, 500, "Please Enter Email or Password")
        }
        const HashedPassword = await bcrypt.hash(password, 10)
        const newAdmin = new Admin({ password: HashedPassword, email })
        // generate token to identify each user
        const token = jwt.sign({
            userId: newAdmin._id,
            role: newAdmin.role
        }, process.env.SECRETKEY, {
            expiresIn: "7d",
        });
        // store the token to database
        newAdmin.token = token;
        newAdmin.save()

        return successResMsg(res, 201, { message: "Admin Registered successfully ", newAdmin: newAdmin, token: token });
    } catch (error) {
        errorResMsg(res, 500, "Could not save admin")
    }
}