const express = require("express")
const Signup = require("../controllers/Signup")
const Login = require("../controllers/Login")
const Verify = require("../middleware/authenticateOtp")
const ResendOTP = require("../middleware/ResendAuthOtp")
const ForgetPassword = require("../controllers/ForgetPassword")
const ResetPassword = require("../controllers/ResetPassword")
const UploadUserProfilePicture = require("../controllers/UploadUserPic")
const upload = require("../image/Multer")
const router = express.Router()


router.post("/signup", Signup)
router.post("/login", Login)
router.post("/confirm-otp", Verify)
router.post("/resend-otp", ResendOTP)
router.post('/profilepic/:id',upload.single('profilePic'), UploadUserProfilePicture);
router.post("'/resetPassword/:token'", ResetPassword)
router.post("/forget-password", ForgetPassword)



module.exports = router;
