const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandsSchema = new Schema({
  brand: {
    shoeName: String,
    styleID: String,
    retailPrice: Number,
    description: String,
    imageLinks: [String],
    thumbnail: String,
    colorway: String,
    resellLinks: {
      stockX: String,
      stadiumGoods: String,
      goat: String,
      flightClub: String,
    },
    size: Number,
    lowestResellPrice: {
      stockX: Number,
      stadiumGoods: Number,
      goat: Number,
      flightClub: Number,
    },
    resellPrices: {
      stockX: {},
      goat: {},
      stadiumGoods: {},
      flightClub: {},
    },
  },
});

const Brands = mongoose.model("Brands", BrandsSchema);
