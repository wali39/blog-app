const Blog = require("../models/Blog");
const User = require("../models/user");

const showBlogs = (req, res) => {
  Blog.find()
    .then((result) => {
      // console.log(result);
      res.render("index", { title: "addblogs", blogs: result });
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogSave = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
const detailsBlog = (req, res) => {
  const user = res.locals.user;
  if (user && user.admin === true) {
    var admin = true;
  }
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render("details", { blog: result, title: "single post", admin: admin });
  });
};
const deleteBlog = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.redirect("/");
};
const createBlog = (req, res) => {
  const user = res.locals.user;
  if (user && user.admin === true) {
    var admin = true;
  }
  res.render("create-blog", {
    title: "create-blogs",
    admin: admin,
  });
};

module.exports = {
  showBlogs,
  blogSave,
  detailsBlog,
  deleteBlog,
  createBlog,
};
