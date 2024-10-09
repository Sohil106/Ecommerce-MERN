const { User } = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email },
      "id email password"
    );
    if (user && user.password === req.body.password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
