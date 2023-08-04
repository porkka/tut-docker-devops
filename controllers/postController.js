const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "Success: Get all posts",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail: Get all posts",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "Success: Get one post",
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail: Get one post",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(200).json({
      status: "Success: Create post",
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail: Create post",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Success: Update post",
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail: Update post",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success: Delete post",
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail: Update post",
    });
  }
};
