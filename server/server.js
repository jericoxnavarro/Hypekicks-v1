const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Routes
const brandsRoute = require("./routes/Brands.routes");
const popularRoute = require("./routes/Popular.routes");

const app = express();
const port = process.env.PORT || 3000;

// Midlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", brandsRoute);
app.use("/api", popularRoute);

// DB Connections
const dbURI = process.env.dbURI;
mongoose
  .connect(`${dbURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to", res.connections[0].name);
    // Server run after DB Connection is up
    app.listen(port, () => {
      console.log("Hypekicks server is running on port", port);
    });
  })
  .catch((err) => console.log(err));
