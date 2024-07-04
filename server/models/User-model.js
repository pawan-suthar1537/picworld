const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accounttype: {
      type: String,
      default: "buyer",
    },
    uploads: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    purchased: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    favorites: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
