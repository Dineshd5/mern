const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const { response } = require("express");
const register = async (req, res) => {
  //getting email and password from the body
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  //if user exists
  if (existingUser) return res.status(400).json({ msg: "User already exists" });

  //if not exists
  const hashpassword = await bcrypt.hash(password, 10);
  const newuser = await User.create({ email, password: hashpassword });
  res.status(201).json({ msg: "Registered Succesfully" });
};

const login = async (req, res) => {
  //getting email and password from the body
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return response.status(401).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return response.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.json({ token });
};

module.exports = { register, login };
