const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Wishlist = new Schema(
  {
    _id: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", Wishlist, "wishlists");