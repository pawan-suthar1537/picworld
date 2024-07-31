const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { readdirSync } = require("fs");
const connect = require("./utils/DB");
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (e.g., mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World from picword server");
});

// require routes dynamic
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
    process.exit(1);
  });
