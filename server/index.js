const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { readdirSync } = require("fs");
const connect = require("./utils/DB");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "https://picworld-six.vercel.app",
      "http://localhost:5173",
      "https://picworld-git-main-pawans-projects-ab78efbb.vercel.app",
      "https://picworld-gufuwuchc-pawans-projects-ab78efbb.vercel.app",
    ],
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
