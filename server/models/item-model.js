const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema(
  {
    _id: { type: String, required: true },
  
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    type: { type: String, required: true },
    brand: [{ type: String, required: true }],
    season: { type: String, required: true },

    sellers: [{ type: Schema.Types.ObjectId, ref: "Seller"}],
    w2c: [{ type: String, required: true }],

    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    own: { type: Number, required: false },
    wish: { type: Number, required: false },

    approved: { type: Boolean, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", Item, "items");