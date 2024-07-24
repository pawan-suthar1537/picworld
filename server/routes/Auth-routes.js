const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User-model");
const { generateToken } = require("../middlewares/VerifyToken");

router.post("/signin", async (req, res) => {
  const { username, email, password, accounttype } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
      accounttype,
    });
    await newUser.save();
    const token = generateToken(newUser);
    res
      .status(200)
      .json({ success: true, msg: "User created", newUser, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }
    const token = generateToken(user);
    res
      .status(200)
      .json({ success: true, msg: "Login successful", user, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
