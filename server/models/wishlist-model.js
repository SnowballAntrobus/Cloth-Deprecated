const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Wishlist = new Schema(
  {
    _id: { type: String, required: true },
    items: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", Wishlist, "wishlists");