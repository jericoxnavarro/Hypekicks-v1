const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../routes/Verify.token");

// Get all users
/*router.get("/user", verify, async (req, res) => {
  try {
    const brand = await User.find();
    res.json(brand);
  } catch (err) {
    res.json({ message: err });
  }
});*/

// Get user
router.get("/user/:userID", verify, async (req, res) => {
  // Check User ID if match
  if (req.params.userID != req.user._id)
    return res.status(401).send("User Access Denied");

  try {
    const user = await User.findById(req.params.userID);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get user favorites
router.get("/user/favorites/:userID", verify, async (req, res) => {
  // Check User ID if match
  if (req.params.userID != req.user._id)
    return res.status(401).send("User Access Denied");

  try {
    const user = await User.findById(req.params.userID);
    res.json(user.favorites);
  } catch (err) {
    res.json({ message: err });
  }
});

const validationCreate = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  address: Joi.string().min(6).required(),
});

// Add user
router.post("/user/create", async (req, res) => {
  // Request Validations
  const { error } = validationCreate.validate(req.body);
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
    res.json({ user: user._id, message: "User Created" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Favorites
router.put("/user/updatefavorites/:userID", verify, async (req, res) => {
  // Check User ID if match
  if (req.params.userID != req.user._id)
    return res.status(401).send("User Access Denied");

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

const validationLogin = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});

// User log in
router.post("/user/login", async (req, res) => {
  // Request Validations
  const { error } = validationLogin.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).send({ message: "Username or Password is wrong" });
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ message: "Invalid Password" });

  // Create and assign token
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.header("auth-token", token).send({ token: token });
});

module.exports = router;
