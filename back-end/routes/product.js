const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

//C R U D

router
  .post("/", productController.createProduct)
  .get("/", productController.fetchAllProducts)
  .patch("/", productController.updateProduct)
  .get("/:id", productController.fetchAllProductById);

exports.router = router;
