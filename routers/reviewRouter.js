const router = require("express").Router({ mergeParams: true });
const {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");
const { auth } = require("../controllers/authControllers");
const { checkProduct, checkReview } = require("../middleware/test");

router
  .route("/reviews")
  .get(checkProduct, getReviews)
  .post(auth, checkProduct, createReview);
router
  .route("/reviews/:rId")
  .get(auth, checkProduct, checkReview, getSingleReview)
  .put(auth, checkProduct, checkReview, updateReview)
  .delete(auth, checkProduct, checkReview, deleteReview);

module.exports = router;
