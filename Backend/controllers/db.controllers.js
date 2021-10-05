const User = require("../Model/data");

//Add User
exports.addUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//Lisat User
exports.listData = async (req, res) => {
  try {
    const userdata = await User.find();
    res.status(201).json(userdata);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Edit User
exports.editUser = async (req, res) => {
  const user = req.body;
  const editUser = new User(user);
  try {
    await User.updateOne({ _id: req.params.id }, user);
    res.status(201).json(editUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Get User By Id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//User Delete
exports.UserDelete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).json("User deleted successfully!!!");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
