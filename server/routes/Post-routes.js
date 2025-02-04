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
    // Populate user details in posts
    const posts = await Post.find({}).populate(
      "user",
      "username email accounttype"
    );
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
    if (accounttype === "buyer") {
      const user = await User.findById(userId).populate("purchased");
      if (!user.purchased || user.purchased.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No posts found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "All Posts fetched successfully",
        data: user.purchased,
      });
    } else {
      const user = await User.findById(userId).populate("uploads");
      if (!user.uploads || user.uploads.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No posts found",
        });
      }
      // Populate user details in each post
      const populatedUploads = await Post.find({
        _id: { $in: user.uploads },
      }).populate("user", "username email accounttype");
      return res.status(200).json({
        success: true,
        message: "All Posts fetched successfully",
        data: populatedUploads,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/image/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const { userId } = post;
    if (userId.toString() !== req.id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { uploads: id },
    });

    // await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/image/search", async (req, res) => {
  const { serch } = req.query;
  try {
    const posts = await Post.find(
      $or(
        { title: { $regex: serch, $options: "i" } },
        { user: { $regex: serch, $options: "i" } }
      )
    ).populate("user", "username email accounttype");
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

router.post(
  "/image/removefromfavorite/:postid",
  verifyToken,
  async (req, res) => {
    const userId = req.id;
    const { postid } = req.params;

    try {
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { favorites: postid },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Post removed from favorites successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);
router.put("/image/addtofavorite/:postid", verifyToken, async (req, res) => {
  const userId = req.id;
  const { postid } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $push: { favorites: postid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post added to favorites successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/myfavorites", verifyToken, async (req, res) => {
  try {
    const userId = req.id;

    const { favorites } = await User.findById(userId).populate("favorites");

    const uploadedby = await Post.find({
      _id: { $in: favorites },
    }).populate("user", "username email accounttype");

    if (!favorites || favorites.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All favorites Posts fetched successfully",
      data: {
        favorites,
        uploadedby,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/postbyrange", verifyToken, async (req, res) => {
  try {
    const userId = req.id;
    const accounttype = req.accounttype;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing",
      });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let data;
    if (accounttype === "buyer") {
      user = await user.populate("purchased");
      data = user.purchased;
    } else {
      user = await user.populate("uploads");
      data = user.uploads;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const postsThisYear = data.filter(
      (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = data.filter(
      (post) => new Date(post.createdAt) >= startOfMonth
    );
    const postsThisWeek = data.filter(
      (post) => new Date(post.createdAt) >= startOfWeek
    );

    return res.status(200).json({
      success: true,
      message: "All Posts fetched successfully",
      data: {
        tillNow: data,
        thisYear: postsThisYear,
        thisMonth: postsThisMonth,
        thisWeek: postsThisWeek,
      },
    });
  } catch (error) {
    console.error("Error fetching posts by range:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
