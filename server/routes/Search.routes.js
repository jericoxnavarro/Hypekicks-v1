const express = require("express");
const router = express.Router();
const Brands = require("../models/Brands.model");

router.get("/search/:query", async (req, res) => {
  try {
    await Brands.find(
      {
        "sneakers.shoeName": "Nike Air Rubber Dunk Off-White UNC",
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
