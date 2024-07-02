const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.json("auth route");
});

module.exports = router;
