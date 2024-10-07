const express = require("express");
const brandController = require("../controller/brand");
const router = express.Router();

//C R U D

router
  .get("/", brandController.fetchBrands)
  .post("/", brandController.createBrand);

exports.router = router;
