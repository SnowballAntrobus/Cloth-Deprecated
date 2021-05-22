const express = require("express");

const auth = require("../middlewares/auth-middleware");

const ReviewCtrl = require("../controllers/review-ctrl");

const router = express.Router();

router.post("/review/:id", auth.checkIfAuthenticatedId, ReviewCtrl.createReview);
router.put("/review/:id", auth.checkIfAuthenticatedId, ReviewCtrl.updateReview);
router.delete("/review/:id", auth.checkIfAdmin, ReviewCtrl.deleteReview);
router.get("/review/:id", ReviewCtrl.getReviewById);

module.exports = router;