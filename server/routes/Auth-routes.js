const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User-model");
const { generateToken, verifyToken } = require("../middlewares/VerifyToken");

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

router.get("/switchprofile", verifyToken, async (req, res) => {
  const userid = req.id;
  console.log(userid);
  const currentAccountType = req.accounttype;

  try {
    const user = await User.findById(userid);
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User does not exist" });
    }

    const newAccountType = currentAccountType === "buyer" ? "seller" : "buyer";

    user.accounttype = newAccountType;
    await user.save();

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      msg: `Profile switched to ${user.accounttype} successfully`,
      user: {
        id: user._id,
        username: user.username,
        accounttype: user.accounttype,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
