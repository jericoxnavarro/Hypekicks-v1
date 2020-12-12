const SneaksAPI = require("./Sneaks.controllers");
const Popular = require("../models/Popular.model");
const Brands = require("../models/Brands.model");

exports.getPopular = async () => {
  try {
    const sneaks = new SneaksAPI();
    sneaks.getMostPopular(async (err, products) => {
      const popular = await Popular.find();
      if (popular[0].sneakers.length < products.length) {
        const updatePopular = await Popular.updateOne(
          { _id: popular[0]._id },
          { $set: { sneakers: products } }
        );
        console.log(updatePopular);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getBrand = async (brandName) => {
  try {
    const sneaks = new SneaksAPI();
    sneaks.getProducts(brandName, async (err, products) => {
      const brand = await Brands.find({ brandName: brandName });
      console.log(brand);
      if (brand[0].sneakers.length < products.length) {
        const updateBrand = await Brands.updateOne(
          { _id: brand[0]._id },
          { $set: { sneakers: products } }
        );
        console.log(updateBrand);
        console.log(brand[0].sneakers.length);
        console.log(products.length);
      } else {
        console.log("Not Updated");
        console.log(brand[0].sneakers.length);
        console.log(products.length);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getPrices = async (brandName) => {
  try {
    const brand = await Brands.find({ brandName: brandName });
    const sneaks = new SneaksAPI();
    const sneakers = brand[0].sneakers;
    let products = [];
    for (let i = 0; i < sneakers.length; i++) {
      const imageLinks = brand[0].sneakers[i].imageLinks;
      const styleId = brand[0].sneakers[i].styleID;
      const description = brand[0].sneakers[i].description;
      if (imageLinks.length === 0) {
        sneaks.getProductPrices(styleId, async (err, product) => {
          let data = brand[0].sneakers[i];
          if (err) {
            products.push(data);
            return console.log(err);
          }

          data["resellPrices"] = product.resellPrices;
          data.imageLinks = product.imageLinks;
          if (description === "" && product.description !== "") {
            data.description = product.description;
          }
          console.log(err);
          products.push(data);
        });
      }
    }
    console.log(products);
  } catch (err) {
    console.log(err.message);
  }
};
