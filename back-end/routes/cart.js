const express = require("express");
const cartController = require("../controller/cart");
const router = express.Router();

//C R U D

router
  .post("/", cartController.addToCart)
  .patch("/:id", cartController.updateCartItem)
  .delete("/:id", cartController.deleteCartItem)
  .get("/", cartController.fetchCartItemsByUser);

exports.router = router;
