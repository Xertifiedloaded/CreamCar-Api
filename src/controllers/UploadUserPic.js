const { errorResMsg, successResMsg } = require("../library/ErrorHandler");
const Cloudinary = require("cloudinary");
const User = require("../models/User");

const UploadUserProfilePicture = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return errorResMsg(res, 400, "User Not Found");
        }
        const result = await Cloudinary.v2.uploader.upload(req.file.path);
        const updateUser = await User.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                profilePic: result.secure_url
            },
            {
                isNew: true
            }
        );
        return successResMsg(res, 200, { message: "image successfully Uploaded", updateUser })
    } catch (error) {
        console.log(error.message)
        return errorResMsg(res, 500, "error uploading profile picture")
    }
};
module.exports = UploadUserProfilePicture