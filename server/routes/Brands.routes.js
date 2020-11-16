const express = require("express");
const router = express.Router();
const Brands = require("../models/Brands.model");

// Get all Brands
router.get("/brands", async (req, res) => {
  try {
    const brand = await Brands.find();
    res.json(brand);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Brand
router.get("/brands/:brandId", async (req, res) => {
  try {
    const brand = await Brands.findById(req.params.brandId);
    res.json(brand);
  } catch (err) {
    res.json({ message: err });
  }
});

// Add Brand
router.post("/brands/add", async (req, res) => {
  const brand = new Brands({
    brandName: req.body.brandName,
    sneakers: req.body.sneakers,
  });
  try {
    const saveBrand = await brand.save();
    res.json(saveBrand);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update Brands
router.patch("/brands/update/:brandId", async (req, res) => {
  try {
    const updateBrand = await Brands.updateOne(
      { _id: req.params.brandId },
      { $set: { sneakers: req.body.sneakers } }
    );
    res.json(updateBrand);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Brand
router.delete("/brands/delete/:brandId", async (req, res) => {
  try {
    const removeBrand = await Brands.remove({ _id: req.params.brandId });
    res.json(removeBrand);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;