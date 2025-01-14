import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    res.send(allUser);
  } catch (e) {
    res.status(500).send({
      message: "couldn't find User",
    });
  }
};
export const createUser = async (req, res) => {
  const { name, username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      username,
      password,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  const { name, username, password, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      username,
      password,
      email,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
