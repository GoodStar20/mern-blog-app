const Blog = require("../models/blogModel");
const main = require("../app");

//create blog
exports.createBlog = async (req, res, next) => {
  const { title, content, image } = req.body;

  try {
    const blog = await Blog.create({
      title,
      content,
      postedBy: req.user._id,
      image
    });
    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get blogs
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "name");
    res.status(201).json({
      success: true,
      blogs
    });
  } catch (error) {
    next(error);
  }
};

//get single blog
exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("comments.postedBy", "name")
      .populate("postedBy", "name");
    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

//delete blog
exports.deleteBlog = async (req, res, next) => {
  await Blog.findById(req.params.id);

  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

//update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const currentBlog = await Blog.findById(req.params.id);

    //build the object data
    const data = {
      title: title || currentBlog.title,
      content: content || currentBlog.content,
      image: image || currentBlog.image
    };

    const blogUpdate = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true
    });

    res.status(200).json({
      success: true,
      blogUpdate
    });
  } catch (error) {
    next(error);
  }
};

//add comment
exports.addComment = async (req, res, next) => {
  const { comment } = req.body;
  try {
    const blogComment = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } }
      },
      { new: true }
    );
    const blog = await Blog.findById(blogComment._id).populate(
      "comments.postedBy",
      "name email"
    );
    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

//add like
exports.addLike = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id }
      },
      { new: true }
    );
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "name");
    main.io.emit("add-like", blogs);

    res.status(200).json({
      success: true,
      blog,
      blogs
    });
  } catch (error) {
    next(error);
  }
};

//remove like
exports.removeLike = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id }
      },
      { new: true }
    );

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "name");
    main.io.emit("remove-like", blogs);

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};
