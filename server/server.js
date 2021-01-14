const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

//Routes
const brandsRoute = require("./routes/Brands.routes");
const popularRoute = require("./routes/Popular.routes");
const userRoute = require("./routes/User.routes");
const searchRoute = require("./routes/Search.routes");
const UserControllers = require("./controllers/User.controllers");

const app = express();
const port = process.env.PORT;

// Midlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", brandsRoute);
app.use("/api", popularRoute);
app.use("/api", userRoute);
app.use("/api", searchRoute);
app.get("/api", UserControllers.Routes);

app.use(express.static("./build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build/index.html"));
});

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
    });
  })
  .catch((err) => console.log(err));
