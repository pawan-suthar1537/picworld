const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const connect = () => {
  return mongoose
    .connect(db)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = connect;
