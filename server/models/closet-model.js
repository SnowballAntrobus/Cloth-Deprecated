const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Closet = new Schema(
  {
    _id: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Closet", Closet, "closets");