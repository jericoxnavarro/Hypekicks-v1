const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandsSchema = new Schema({
  brandName: String,
  sneakers: [
    {
      shoeName: String,
      brand: String,
      silhoutte: String,
      styleID: String,
      retailPrice: Number,
      releaseDate: String,
      description: String,
      imageLinks: [String],
      thumbnail: String,
      urlKey: String,
      make: String,
      colorway: String,
      resellLinks: {
        stockX: String,
        stadiumGoods: String,
        goat: String,
        flightClub: String,
      },
      size: Number,
      lowestResellPrice: {
        stockX: { type: Number, default: 0 },
        stadiumGoods: { type: Number, default: 0 },
        goat: { type: Number, default: 0 },
        flightClub: { type: Number, default: 0 },
      },
      resellPrices: {
        stockX: {},
        goat: {},
        stadiumGoods: {},
        flightClub: {},
      },
    },
  ],
});

const Brands = mongoose.model("Brands", BrandsSchema);

module.exports = Brands;
