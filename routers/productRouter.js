const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  getByCategory,
} = require("../controllers/productControllers");
const { auth } = require("../controllers/authControllers");

const { checkProduct, checkCategory } = require("../middleware/test");

router.route("/").get(getProducts).post(auth, createProduct);
router
  .route("/:pId")
  .put(auth, checkProduct, updateProduct)
  .get(checkProduct, getSingleProduct)
  .delete(auth, checkProduct, deleteProduct);
router.route("/category/:cId").get(checkCategory, getByCategory);

module.exports = router;
