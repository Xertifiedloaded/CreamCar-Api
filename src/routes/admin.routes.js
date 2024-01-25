const express = require("express")
const { AdminSignUp } = require("../controllers/Admin.Controller")
const { AdminLogin } = require("../controllers/admin.login")
const upload = require("../image/Multer")
const isAuthenticated = require("../middleware/Authentication")
const car = require("../controllers/car.controller")
const { adminAuth } = require("../middleware/confirmUser")
const getPost = require("../controllers/getPost")

const router = express.Router()
router.post("/signup", AdminSignUp)
router.post("/login", AdminLogin)
router.post('/post', car);
router.get('/allpost', getPost);

module.exports = router