const express = require("express");
const Post = require("../models/Post-model");
const User = require("../models/User-model");
const { verifyToken } = require("../middlewares/VerifyToken");
const router = express.Router();

router.post("/image/upload", verifyToken, async (req, res) => {
  const userId = req.id;
  const accounttype = req.accounttype;

  if (accounttype !== "seller") {
    return res.status(401).json({
      success: false,
      message: "Only sellers can create posts",
    });
  }

  const { title, user, price, image, public_id } = req.body;

  try {
    if (!title || !user || !price || !image || !public_id) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const post = new Post({
      title,
      user,
      price,
      image,
      public_id,
      userId: userId,
    });

    await post.save();
    await User.findByIdAndUpdate(userId, {
      $push: { uploads: post._id },
    });
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/image/all", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All Posts fetched successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/image/myposts", verifyToken, async (req, res) => {
  const userId = req.id;
  const accounttype = req.accounttype;
  try {
    if (accounttype == "buyer") {
      const { purchased } = await User.findById(userId).populate("purchased");
      if (!purchased || purchased.length === 0) {
        return res.status(500).json({
          success: false,
          message: "No posts found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "All Posts fetched successfully",
        data: purchased,
      });
    } else {
      const { uploads } = await User.findById(userId).populate("uploads");
      if (!uploads || uploads.length === 0) {
        return res.status(500).json({
          success: false,
          message: "No posts found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "All Posts fetched successfully",
        data: uploads,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
