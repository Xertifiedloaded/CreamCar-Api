const { successResMsg, errorResMsg } = require('../../library/ErrorHandler')
const categories = require('../../models/categories.model')
const getAllCategory = async (req, res) => {
    try {
        const getCategory = await categories.find()
        return successResMsg(res, 200, { message: "post fetch successfully",getCategory })
    } catch (error) {
        errorResMsg(res, 500, "category Not Found")
    }
}
module.exports = getAllCategory