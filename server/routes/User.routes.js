const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// Get all users
router.get("/user", async (req, res) => {
  try {
    const brand = await User.find();
    res.json(brand);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get user
router.get("/user/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get user favorites
router.get("/user/favorites/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    res.json(user.favorites);
  } catch (err) {
    res.json({ message: err });
  }
});

const validationSchema = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  address: Joi.string().min(6).required(),
});

// Add user
router.post("/user/create", async (req, res) => {
  // Request Validations
  const { error } = validationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Check if username exists
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("Username already exists");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    fullname: req.body.fullname,
    email: req.body.email,
    address: req.body.address,
    favorites: [],
  });

  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Favorites
router.put("/user/updatefavorites/:userID", async (req, res) => {
  try {
    const updateFavorites = await User.updateOne(
      { _id: req.params.userID },
      { $push: { favorites: [req.body.sneaker] } }
    );
    res.json(updateFavorites);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
