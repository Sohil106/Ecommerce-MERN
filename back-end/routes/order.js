const express = require("express");
const orderController = require("../controller/order");
const router = express.Router();

//C R U D

router
  .post("/", orderController.createOrder)
  .patch("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder)
  .get("/", orderController.fetchOrdersByUser);

exports.router = router;
