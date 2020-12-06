const express = require("express");
const router = express.Router();
const Popular = require("../models/Popular.model");

router.get("/popular", async (req, res) => {
  try {
    const popular = await Popular.find();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pageLength = Math.ceil(popular[0].sneakers.length / limit);
    const resultPopulars = popular[0].sneakers.slice(startIndex, endIndex);
    if (page > pageLength) {
      res.json({
        message: `Sorry, the page you're looking for doesn't exist.`,
        data: false,
      });
    } else if (page < 1) {
      res.json({
        message: `Sorry, the page you're looking for doesn't exist.`,
        data: false,
      });
    } else {
      res.json({
        pageLength: pageLength,
        next: page + 1,
        previous: page - 1,
        limit: limit,
        data: resultPopulars,
      });
    }
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
