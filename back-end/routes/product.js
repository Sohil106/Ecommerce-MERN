const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

//C R U D

router
  .post("/", productController.createProduct)
  .get("/", productController.fetchAllProducts)
  .patch("/:id", productController.updateProduct)
  .get("/:id", productController.fetchProductById);

exports.router = router;
