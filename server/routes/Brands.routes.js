const express = require("express");
const router = express.Router();

const BrandsController = require("../controllers/Brands.controllers");

// Get all Brands
router.get("/brands", BrandsController.getBrands);

// Get Brand
router.get("/brands/:brandName", BrandsController.getBrand);

// Add Brand
router.post("/brands/add", BrandsController.addBrand);

// Update Brands
router.patch("/brands/update/:brandId", BrandsController.updateBrand);

// Delete Brand
router.delete("/brands/delete/:brandId", BrandsController.deleteBrand);

module.exports = router;
