const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connecteed To database")
    } catch (error) {
        console.log(error.message)
        console.log("error connecting to database")
    }
}
module.exports = connectDB