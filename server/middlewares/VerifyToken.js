const jwt = require("jsonwebtoken");

// Function to generate JWT
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    accounttype: user.accounttype,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.id = verified.id;
    req.accounttype = verified.accounttype;
    req.user = verified;
    console.log("from verifyToken", verified.accounttype);
    console.log("from verifyToken", verified);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
