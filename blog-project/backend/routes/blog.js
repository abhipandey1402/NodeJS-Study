const express = require("express");
const router = express();

const { isAuth } = require("../middlewares/AuthMiddleware");
const {
  createBlog,
  getUserBlogs,
  deleteBlog,
  editBlog,
} = require("../controllers/blog.controllers");

router.post("/createBlog", isAuth, createBlog);
router.get("/getUserBlogs", isAuth, getUserBlogs);
router.delete("/deleteBlog/:blogId", deleteBlog);
router.put("/editBlog", editBlog);

module.exports = router;
