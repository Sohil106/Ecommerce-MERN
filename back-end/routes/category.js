const express = require("express");
const categoryController = require("../controller/category");
const router = express.Router();

//C R U D

router
  .get("/", categoryController.fetchCategories)
  .post("/", categoryController.createCategory);

exports.router = router;
