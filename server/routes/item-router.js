const express = require("express");

const auth = require("../middlewares/auth-middleware");

const ItemCtrl = require("../controllers/item-ctrl");

const router = express.Router();

router.post("/item", auth.checkIfAuthenticated, ItemCtrl.createItem);
router.put("/item/:id", auth.checkIfAuthenticated, ItemCtrl.updateItem);
router.put("/item/add-review/:id", auth.checkIfAuthenticatedId, ItemCtrl.updateItemReviews);
router.delete("/item/:id", auth.checkIfAdmin, ItemCtrl.deleteItem);
router.get("/item/:id", ItemCtrl.getItemById);
router.get("/items", ItemCtrl.getItems);

module.exports = router;