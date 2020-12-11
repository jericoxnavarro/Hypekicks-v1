const express = require("express");
const router = express.Router();

const PopularControllers = require("../controllers/Popular.controllers");

router.get("/popular", PopularControllers.getPopular);

router.post("/popular/add", PopularControllers.addPopular);

module.exports = router;
