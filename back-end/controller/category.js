const { Category } = require("../model/category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const response = await category.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
};
