const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema(
  {
    uid: { type: String, required: true },
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    w2c: { type: String, required: true },

    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    size: { type: String, required: true },
    fit: { type: String, required: true },

    quality: { type: Number, required: true },
    similarity: { type: Number, required: true },
    
    fire: { type: Number, required: true },
    description: { type: String, required: false },
    imagesLink: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", Review, "review");