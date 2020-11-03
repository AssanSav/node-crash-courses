const express = require("express")
const router = express.Router()
const Blog = require("../models/blog")
const blogsController = require("../controllers/blogController")


router.get("/", blogsController.blogs_index)
router.post("/", blogsController.blog_create_post)
router.get("/create", blogsController.blog_create_get)
router.get("/:id", blogsController.blog_details)
router.delete("/:id", blogsController.blog_delete)

module.exports = router