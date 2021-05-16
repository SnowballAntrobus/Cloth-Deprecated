const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    points: { type: Number, required: false },
    admin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User, "users");