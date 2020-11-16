const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PopularSchema = new Schema({
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
  ],
});

const Popular = mongoose.model("Popular", PopularSchema);

module.exports = Popular;
