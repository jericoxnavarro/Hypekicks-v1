const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const Popular = require("./models/Popular.model");
require("dotenv").config();

//Routes
const brandsRoute = require("./routes/Brands.routes");
const popularRoute = require("./routes/Popular.routes");
const userRoute = require("./routes/User.routes");
const searchRoute = require("./routes/Search.routes");

const app = express();
const port = process.env.PORT_MAIN || 3000;

// Midlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", brandsRoute);
app.use("/api", popularRoute);
app.use("/api", userRoute);
app.use("/api", searchRoute);

app.get("/api/new", async (req, res) => {});

// DB Connections
const dbURI = process.env.dbURI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose.Promise = global.Promise;
mongoose
  .connect(`${dbURI}`, options)
  .then((res) => {
    console.log("Connected to", res.connections[0].name);
    // Server run after DB Connection is up
    app.listen(port, async () => {
      console.log("Hypekicks server is running on port", port);
      try {
        /*await sneaks.getMostPopular(async (err, products) => {
          const popular = await Popular.find();
          if (popular[0].sneakers.length < products.length) {
            const updatePopular = await Popular.updateOne(
              { _id: popular[0]._id },
              { $set: { sneakers: products } }
            );
            console.log(updatePopular);
          }
        });*/
      } catch (err) {
        console.log(err);
      }
    });
  })
  .catch((err) => console.log(err));
