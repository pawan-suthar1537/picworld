const express = require("express");
const router = express.Router();
const razorpay = require("razorpay");
const User = require("../models/User-model");
const Order = require("../models/Order-model");
const Post = require("../models/Post-model");
const crypto = require("crypto");

const { generateToken, verifyToken } = require("../middlewares/VerifyToken");

const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/payment", verifyToken, async (req, res) => {
  const purchaserid = req.id;
  const { price } = req.body;

  try {
    let user = await User.findById(purchaserid);
    if (!user) {
      console.error("User not found:", purchaserid);
      return res.status(404).json({ message: "User not found" });
    }

    const options = {
      amount: Number(price * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayinstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: error.message });
      }

      return res.status(200).json({
        message: "Order created successfully",
        data: order,
      });
    });
  } catch (error) {
    console.error("Error processing payment request:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify", verifyToken, async (req, res) => {
  const purchaserid = req.id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    posturl,
    postid,
    user,
    title,
    price,
  } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuth = expectedSign === razorpay_signature;
    if (!isAuth) {
      console.error("Signature mismatch:", expectedSign, razorpay_signature);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const order = new Order({
      purchaserid,
      razorpayorderid: razorpay_order_id,
      razorpaypaymentid: razorpay_payment_id,
      razorpaysignature: razorpay_signature,
      posturl,
      user,
      title,
      price,
    });

    const savedOrder = await order.save();

    await User.findByIdAndUpdate(purchaserid, {
      $push: {
        purchased: savedOrder._id,
      },
    });

    await Post.findByIdAndUpdate(postid, {
      $push: {
        purchasedBy: purchaserid,
      },
    });

    return res.status(201).json({
      message: "Order verified and saved successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error verifying purchase:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders/get", verifyToken, async (req, res) => {
  const userid = req.id;
  const accounttype = req.accounttype;
  const user = req.username;

  try {
    let orders;
    if (accounttype == "buyer") {
      orders = await Order.find({ purchaserid: userid });
    } else {
      const orderdata = await Order.find({ user });
      const { username } = await User.findById(orderdata[0].purchaserid);
      orders = orderdata.map((order) => {
        return {
          ...order._doc,

          purchasername: username,
        };
      });
    }
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
