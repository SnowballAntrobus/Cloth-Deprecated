const express = require("express");

const auth = require("../middlewares/auth-middleware");

const UserCtrl = require("../controllers/user-ctrl");

const router = express.Router();

router.post("/user", UserCtrl.createUser);
router.put("/user/:id", auth.checkIfAdmin, UserCtrl.updateUser);
router.delete("/user/:id", auth.checkIfAdmin, UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.get("/users", UserCtrl.getUsers);

module.exports = router;