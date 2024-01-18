const express = require("express")
const Signup = require("../controllers/Signup")
const Login = require("../controllers/Login")
const Verify = require("../middleware/authenticateOtp")
const ResendOTP = require("../middleware/ResendAuthOtp")
const router = express.Router()

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/confirm-otp", Verify)
router.post("/resend-otp", ResendOTP)



module.exports = router;