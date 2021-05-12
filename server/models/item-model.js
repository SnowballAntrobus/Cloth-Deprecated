const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema(
  {
    _id: { type: String, required: true },
    imageURL: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    season: { type: String, required: true },
    w2c: [{ type: String, required: true }],
    own: { type: Number, required: false },
    wish: { type: Number, required: false },

    approved: { type: Boolean, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", Item, "items");