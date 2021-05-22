const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const itemRouter = require("./routes/item-router");
const wishlistRouter = require("./routes/wishlist-router");
const closetRouter = require("./routes/closet-router");
const userRouter = require("./routes/user-router");
const reviewRouter = require("./routes/review-router");

const app = express();
const apiPort = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

app.use("/api", itemRouter);
app.use("/api", wishlistRouter);
app.use("/api", closetRouter);
app.use("/api", userRouter);
app.use("/api", reviewRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
