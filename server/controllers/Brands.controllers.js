const Brands = require("../models/Brands.model");

exports.getBrands = async (req, res) => {
  try {
    const brand = await Brands.find();
    return res
      .status(200)
      .json({ status: 200, data: brand, message: "Brands Retrived" });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await Brands.find({ brandName: req.params.brandName });
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pageLength = Math.ceil(brand[0].sneakers.length / limit);
    const resultBrands = brand[0].sneakers.slice(startIndex, endIndex);
    if (page > pageLength) {
      return res.status(400).json({
        message: `Sorry, the page you're looking for doesn't exist.`,
        data: false,
        status: 400,
      });
    } else if (page < 1) {
      return res.status(400).json({
        message: `Sorry, the page you're looking for doesn't exist.`,
        data: false,
        status: 400,
      });
    } else {
      return res.status(200).json({
        pageLength: pageLength,
        next: page + 1,
        previous: page - 1,
        limit: limit,
        status: 200,
        dataLength: brand[0].sneakers.length,
        data: resultBrands,
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.addBrand = async (req, res) => {
  const brand = new Brands({
    brandName: req.body.brandName,
    sneakers: req.body.sneakers,
  });
  try {
    const saveBrand = await brand.save();
    return res
      .status(200)
      .json({ data: saveBrand, message: "Brand is Added", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const updateBrand = await Brands.updateOne(
      { _id: req.params.brandId },
      { $set: { sneakers: req.body.sneakers } }
    );
    return res
      .status(200)
      .json({ data: updateBrand, message: "Brand Updated", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const removeBrand = await Brands.remove({ _id: req.params.brandId });
    return res
      .status(200)
      .json({ data: removeBrand, message: "Brand Removed", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
