const { Cart } = require("../model/cart");

exports.addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    const doc = await cartItem.save();
    const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.updateCartItem = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id } = req.params;
      const doc = await Cart.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const result = await doc.populate("product");
      res.status(201).json(result);
    } else {
      res.status(400).json("id not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchCartItemsByUser = async (req, res) => {
  try {
    const { user } = req.query;
    if (user) {
      const cartItems = await Cart.find({ user: user })
        .populate("user")
        .populate("product");
      res.status(200).json(cartItems);
    } else {
      res.status(400).json("User ID not provided");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id } = req.params;
      const doc = await Cart.findByIdAndDelete(id);
      res.status(200).json(doc);
    } else {
      res.status(400).json("id not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
