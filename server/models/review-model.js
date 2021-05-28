const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema(
  {
    uid: { type: String, required: true },
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "Seller", required: true},

    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    size: { type: String, required: true },

    fit: { type: Number, required: true },
    quality: { type: Number, required: true },
    accuracy: { type: Number, required: false },
    fire: { type: Number, required: true },
    
    description: { type: String, required: false },
    imagesLink: { type: String, required: false },

    approved: { type: Boolean, required: false },
    points: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", Review, "reviews");