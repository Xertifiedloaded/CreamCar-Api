
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin.models");
const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
exports.AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return errorResMsg(res, 404, "Admin not found");
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return errorResMsg(res, 401, "Invalid password");
        }
        const token = jwt.sign({ userId: admin._id }, process.env.SECRETKEY, {
            expiresIn: "7d",
        });
        admin.token = token

        return successResMsg(res, 200, { message: "Login successful", admin, });
    } catch (error) {
        return errorResMsg(res, 500, "Error during login");
    }
};