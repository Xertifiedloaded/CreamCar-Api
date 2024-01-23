const express = require("express")
const { AdminSignUp } = require("../controllers/Admin.Controller")
const { AdminLogin } = require("../controllers/admin.login")

const router = express.Router()
router.post("/signup", AdminSignUp)
router.post("/login", AdminLogin)
module.exports = router