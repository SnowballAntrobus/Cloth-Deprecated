const express = require("express");

const auth = require("../middlewares/auth-middleware");

const WishlistCtrl = require("../controllers/wishlist-ctrl");

const router = express.Router();

router.post("/wishlist/:id", auth.checkIfAuthenticatedId, WishlistCtrl.createWishlist);
router.get("/wishlist/:id", WishlistCtrl.getWishlistById);
router.put("/wishlist/:id", auth.checkIfAuthenticatedId, WishlistCtrl.updateWishlist);

module.exports = router;