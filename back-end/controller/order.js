const { Order } = require("../model/order");

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const doc = await order.save();
    const result = await doc.populate("user");
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.updateOrder = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id } = req.params;
      const doc = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const result = await doc.populate("user");
      res.status(201).json(result);
    } else {
      res.status(400).json("id not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchOrdersByUser = async (req, res) => {
  try {
    const { user } = req.query;
    if (user) {
      const orders = await Order.find({ user: user }).populate("user");
      res.status(200).json(orders);
    } else {
      res.status(400).json("User ID not provided");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id } = req.params;
      const doc = await Order.findByIdAndDelete(id);
      res.status(200).json(doc);
    } else {
      res.status(400).json("id not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
