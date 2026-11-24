const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const prodRouter = express.Router();

prodRouter.param("id", (req, res, next, val) => {
  req.id = val;
  //   find Elm
  // req.user = user
  next();
});

prodRouter.get("/", getAllProducts);

prodRouter.get("/:id", getOneProduct);

prodRouter.post("/", createProduct);

prodRouter.put("/:id", updateProduct);

prodRouter.delete("/:id", deleteProduct);

module.exports = prodRouter;
