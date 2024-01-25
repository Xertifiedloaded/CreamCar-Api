const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
const PostCar = require("../models/cars.model");
const cloudinary = require("../image/Cloudinary");
const { adminAuth } = require("../middleware/confirmUser");

const car = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const user = await PostCar.findById(userId);
        if ( user.role !== "admin") {
            return errorResMsg(res, 401, "You are UnAuthorized");
        }
        const { title, content, timeStamp, role } = req.body;
        const CarPost = new PostCar({
            title,
            content,
            timeStamp,
            role
        });
        await CarPost.save();
        return successResMsg(res, 201, { message: "created Successfully", PostCar });
    } catch (error) {
        console.log(error);
        errorResMsg(res, 500, "Post not created");
    }
}
module.exports = car