const express = require("express");

const {
  authentication,
  secureAuthentication,
} = require("../authentication/auth");
const { showBlogs, blogSave } = require("../controller/control");
const Blog = require("../models/Blog");
// const User = require("../models/user");
const control = require("../controller/control");
const router = express.Router();

router.get("/addblogs", control.showBlogs);

router.post("/addblogs", control.blogSave);

router.get("/addblogs/:id", control.detailsBlog);
router.get("/delete/:id", control.deleteBlog);
router.get("/blog-create", secureAuthentication, control.createBlog);

module.exports = router;
