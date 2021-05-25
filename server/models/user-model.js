const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    admin: { type: Boolean, required: false },

    height: { type: Number, required: true },
    weight: { type: Number, required: true },

    location: { type: String, required: false },
    style: [{ type: String, required: false }],
    
    points: { type: Number, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User, "users");