const categories = require("../../models/categories.model");

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await categories.findById(categoryId);

        if (!category) {
            return errorResMsg(res, 404, "Category Not Found");
        }

        return successResMsg(res, 200, { message: "Category fetched successfully", category });
    } catch (error) {
        errorResMsg(res, 500, "Internal Server Error");
    }
};
module.exports = getCategoryById