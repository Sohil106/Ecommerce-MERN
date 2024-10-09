const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

//C R U D

router.post("/signup", authController.createUser);
router.post("/login", authController.loginUser);

exports.router = router;
