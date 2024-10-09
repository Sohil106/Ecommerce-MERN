const { User } = require("../model/user");

exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "email role id addresses");
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(user);
    } else {
      res.status(400).json("id not found");
    }
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

// exports.fetchCategories = async (req, res) => {
//   try {
//     const categories = await Category.find({}).exec();
//     res.status(200).json(categories);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
