const router = require("express").Router();
const { auth } = require("../controllers/authControllers");
const { checkCategory } = require("../middleware/test");
const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.route("/").get(auth, getCategory).post(auth, createCategory);
router
  .route("/:cId")
  .put(auth, checkCategory, updateCategory)
  .delete(auth, checkCategory, deleteCategory);

module.exports = router;
