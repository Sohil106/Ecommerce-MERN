const { Brand } = require("../model/brand");

exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const response = await brand.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find().exec();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};
