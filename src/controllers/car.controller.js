const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
const cloudinary = require("../image/Cloudinary");
const Car = require("../models/cars.model");
const Admin = require("../models/admin.models");

const car = async (req, res) => {
    try {
        console.log(req.decoded);
        const { userId } = req.decoded;
        const admin = await Admin.findById(userId);
        if ( !admin) {
            return errorResMsg(res, 401, "You are UnAuthorized");
        }
        const { title, content } = req.body;
        console.log(req.body);
        const carPost = new Car({
            title,
            content,
            admin: admin._id,
        });
        await carPost.save();
        return successResMsg(res, 201, { message: "created Successfully", carPost });
    } catch (error) {
        console.log(error);
        errorResMsg(res, 500, "Post not created");
    }
}
module.exports = car