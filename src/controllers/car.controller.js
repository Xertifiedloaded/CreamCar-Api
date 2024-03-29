const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
const cloudinary = require("../image/Cloudinary");
const Car = require("../models/cars.model");
const Admin = require("../models/admin.models");
//  authorize only admin to post car
const car = async (req, res) => {
    try {
        console.log(req.decoded);
        const { userId } = req.decoded;
        const admin = await Admin.findById(userId);
        if (!admin) {
            return errorResMsg(res, 401, "You are UnAuthorized");
        }
        const { title, content,paragraph,headline } = req.body;
        console.log(req.body);
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const carPost = new Car({
            title,
            content,
            paragraph,
            headline,
            admin: admin._id, // set admin id that uploaded the news
            image: result.secure_url,

        });
        await carPost.save();
        return successResMsg(res, 201, { message: "created Successfully", carPost });
    } catch (error) {
        console.log(error);
        errorResMsg(res, 500, "Post not created");
    }
}
module.exports = car


