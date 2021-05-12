const express = require("express");

const auth = require("../middlewares/auth-middleware");

const ClosetCtrl = require("../controllers/closet-ctrl");

const router = express.Router();

router.post("/closet", ClosetCtrl.createCloset);
router.get("/closet/:id", ClosetCtrl.getClosetById);
router.put(
  "/closet/:id",
  auth.checkIfAuthenticatedId,
  ClosetCtrl.updateCloset
);

module.exports = router;