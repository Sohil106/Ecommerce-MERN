const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

//C R U D

router
  .patch("/:id", userController.updateUser)
  .get("/:id", userController.fetchUserById);

exports.router = router;
