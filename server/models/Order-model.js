const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    purchaserid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posturl: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    razorpayorderid: {
      type: String,
      required: true,
    },

    razorpaysignature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
