const express = require("express");
const upload = require("../image/Multer");
const isAuthenticated = require("../middleware/Authentication");
const car = require("../controllers/car.controller");
const router = express.Router()
router.post('/post', upload.single('image'), isAuthenticated, car);
module.exports = router