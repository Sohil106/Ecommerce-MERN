const model = require("../model/product");
const Product = model.Product;

//Create
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const response = await product.save();
    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
//todo to get sorting on discounted price not original price

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find();
  let totalItemsQuery = Product.find();
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalItemsQuery = totalItemsQuery.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalItemsQuery = totalItemsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: [req.query._order] });
  }

  let totalItems = await totalItemsQuery.countDocuments().exec();

  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const products = await query.exec();
    res.json({ data: products, items: totalItems });
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id } = req.params;
      response = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(response);
    } else {
      res.status(400).json("id not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
