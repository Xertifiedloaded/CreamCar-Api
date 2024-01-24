
const bcrypt = require("bcryptjs")
const Admin = require("../models/admin.models");
const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
exports.AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find admin to login with email
        const admin = await Admin.findOne({ email });
        // if the email inputed is not the one login
        if (!admin) {
            return errorResMsg(res, 404, "Admin not found");
        }
        // compare email password with the one typed
        const isMatch = await bcrypt.compare(password, admin.password);
        // if password does not match
        if (!isMatch) {
            return errorResMsg(res, 401, "Invalid password");
        }
        // if the password match
        return successResMsg(res, 200, { message: "Login successful", admin });
    } catch (error) {
        return errorResMsg(res, 500, "Error during login");
    }
};