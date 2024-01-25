const { successResMsg, errorResMsg } = require("../library/ErrorHandler");
const carPost = require("../models/cars.model");

const getPost = async (req, res) => {
    try {
        const post = await carPost.find();
        successResMsg(res, 200, { message: "All post Fetched", newpost: post })
    } catch (error) {
        console.log(error.message);
        errorResMsg(res, 500, "post Not Found")
    }
};
module.exports = getPost