
const categories = require('../../models/categories.model');

const cloudinary = require('../../image/Cloudinary');
const { successResMsg, errorResMsg } = require('../../library/ErrorHandler');

const postCategories = async (req, res) => {
    try {
        const { content, paragraph } = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const pictureUrl = result.secure_url;
        const newCategory = await categories.create({
            picture: pictureUrl,
            content,
            paragraph,
        });
        const savedCategory = await newCategory.save();
        return successResMsg(res, 201, { message: "Category post created successfully", savedCategory })
    } catch (error) {
        console.error(error);
        return errorResMsg(res,500,"Internal Server Error")
    }
};

module.exports = postCategories;
