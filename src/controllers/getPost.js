const { successResMsg, errorResMsg } = require("../library/ErrorHandler");
const Cars = require("../models/cars.model");
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

const getAllCars = async (req, res) => {
    try {
    
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit); 
        const startIndex = (page - 1) * limit;
        const allCars = await Cars.find().skip(startIndex).limit(limit);

        successResMsg(res, 200, { message: "Cars fetched successfully", page, limit, totalCars: allCars.length, cars: allCars });

    } catch (error) {
        console.error(error.message);
        errorResMsg(res, 500, `Error fetching cars: ${error.message}`);
    }
}


module.exports ={ getPost, getAllCars}