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
        // Extracting page and limit from query parameters
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit); 

        // Calculate the starting index of cars for the current page
        const startIndex = (page - 1) * limit;

        // Fetch cars with pagination
        const allCars = await Cars.find().skip(startIndex).limit(limit);

        successResMsg(res, 200, { message: "Cars fetched successfully", page, limit, totalCars: allCars.length, cars: allCars });

    } catch (error) {
        console.error(error.message);
        errorResMsg(res, 500, `Error fetching cars: ${error.message}`);
    }
}


module.exports ={ getPost, getAllCars}