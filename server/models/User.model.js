const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: String,
  email: { type: String, required: true, unique: true },
  address: String,
  favorites: [
    {
      shoeName: String,
      brand: String,
      styleID: String,
      thumbnail: String,
      store: String,
      price: String,
      description: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
