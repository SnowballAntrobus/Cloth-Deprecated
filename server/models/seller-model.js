const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Seller = new Schema(
  {
    name: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    approved: { type: Boolean, required: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", Seller, "sellers")