const express = require("express");

const auth = require("../middlewares/auth-middleware");

const SellerCtrl = require("../controllers/seller-ctrl");

const router = express.Router();

router.post("/seller", auth.checkIfAuthenticated, SellerCtrl.createSeller);
router.put("/seller/:id", auth.checkIfAuthenticated, SellerCtrl.updateSeller);
router.delete("/seller/:id", auth.checkIfAdmin, SellerCtrl.deleteSeller);
router.get("/seller/:id", SellerCtrl.getSellerById);
router.get("/sellers", SellerCtrl.getSellers);

module.exports = router;