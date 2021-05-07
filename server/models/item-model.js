const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema(
  {
    type: { type: String, required: true },
    brand: { type: String, required: true },
    season: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", Item, "items");