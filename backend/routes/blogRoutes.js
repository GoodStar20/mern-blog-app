const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  addComment,
  addLike,
  removeLike
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/auth");

router.post("/blog/create", isAuthenticated, createBlog);
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getSingleBlog);
router.delete("/delete/blog/:id", isAuthenticated, deleteBlog);
router.put("/update/blog/:id", isAuthenticated, updateBlog);
router.put("/comment/blog/:id", isAuthenticated, addComment);
router.put("/addlike/blog/:id", isAuthenticated, addLike);
router.put("/removelike/blog/:id", isAuthenticated, removeLike);

module.exports = router;
