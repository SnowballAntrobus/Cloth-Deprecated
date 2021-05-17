const Wishlist = require("../models/wishlist-model");
const mongoose = require('mongoose');

createWishlist = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a wishlist",
    });
  }

  const wishlist = new Wishlist(body);

  if (!wishlist) {
    return res.status(400).json({ success: false, error: err });
  }

  wishlist
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: wishlist._id,
        message: "Wishlist created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Wishlist not created",
      });
    });
};

getWishlistById = async (req, res) => {
  await Wishlist.findOne({ _id: req.params.id }, (err, wishlist) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, error: `Wishlist not found` });
    }
    return res.status(200).json({ success: true, data: wishlist });
  })
    .populate("items")
    .catch((err) => console.log(err));
};

updateWishlist = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Wishlist.findOne({ _id: req.params.id }, (err, wishlist) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Wishlist not found!",
      });
    }
    wishlist.items = body.items;
    wishlist
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: wishlist._id,
          message: "Wishlist updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Wishlist not updated",
        });
      });
  });
};

module.exports = {
  createWishlist,
  getWishlistById,
  updateWishlist,
};