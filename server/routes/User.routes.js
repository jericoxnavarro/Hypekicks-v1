const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

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

// Add user
router.post("/user/add", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    email: req.body.email,
    address: req.body.address,
    favorites: [],
  });
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.json({ message: err });
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
