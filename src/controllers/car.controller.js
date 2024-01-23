const { errorResMsg, successResMsg } = require("../library/ErrorHandler")
const PostCar = require("../models/cars.model")
const cloudinary = require("../image/Cloudinary")
const car = async (req, res) => {
    try {
        const { userId } = req.decoded
        const user = await PostCar.findById(userId)
        console.log(user);
        if (user.role !== "admin") {
            return errorResMsg(res, 401, "You are UnAuthorized");
        }
        const { title, content, timeStamp } = req.body
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const CarPost = new PostCar({
            title,
            content,
            timeStamp,
            image: result.secure_url,
        });
        await CarPost.save();
        return successResMsg(res, 201, { message: "created Successfully", CarPost })
    } catch (error) {
        console.log(error.message)
        errorResMsg(res, 500, "Post not created")
    }

}
module.exports = car