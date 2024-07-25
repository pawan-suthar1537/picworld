const jwt = require("jsonwebtoken");

// Function to generate JWT
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    accounttype: user.accounttype,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
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
    console.log(verified);
    req.id = verified.id;
    req.username = verified.username;
    req.accounttype = verified.accounttype;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
