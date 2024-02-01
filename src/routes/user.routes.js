const express = require('express')
const postCategories = require('../controllers/categories/categories')
const upload = require('../image/Multer')
const getAllCategory = require('../controllers/categories/getAllCategory')
const router = express.Router()
router.post("/categories",upload.single('image'), postCategories)
router.get("/allcategories", getAllCategory)


module.exports = router