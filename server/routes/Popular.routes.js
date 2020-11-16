const express = require("express");
const router = express.Router();
const Popular = require("../models/Popular.model");

router.get("/popular", async (req, res) => {
  try {
    const popular = await Popular.find();
    res.json(popular);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/popular/add", async (req, res) => {
  const popular = new Popular({
    sneakers: req.body.sneakers,
  });
  try {
    const savePopular = await popular.save();
    res.json(savePopular);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
