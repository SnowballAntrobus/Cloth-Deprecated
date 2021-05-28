const Closet = require("../models/closet-model");

createCloset = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a closet",
    });
  }

  const closet = new Closet(body);

  if (!closet) {
    return res.status(400).json({ success: false, error: err });
  }

  closet
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: closet._id,
        message: "Closet created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Closet not created",
      });
    });
};

getClosetById = async (req, res) => {
  await Closet.findOne({ _id: req.params.id }, (err, closet) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!closet) {
      return res
        .status(404)
        .json({ success: false, error: `Closet not found` });
    }
    return res.status(200).json({ success: true, data: closet });
  })
    .populate("items")
    .catch((err) => console.log(err));
};

updateCloset = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Closet.findOne({ _id: req.params.id }, (err, closet) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Closet not found!",
      });
    }
    closet.items = body.items;
    closet.reviews = body.reviews;
    closet
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: closet._id,
          message: "Closet updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Closet not updated",
        });
      });
  });
};

module.exports = {
  createCloset,
  getClosetById,
  updateCloset,
};