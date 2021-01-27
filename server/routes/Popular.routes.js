const express = require("express");
const router = express.Router();

const PopularControllers = require("../controllers/Popular.controllers");

router.get("/popular", PopularControllers.getPopular);

router.post("/popular/add", PopularControllers.addPopular);

router.get("/popular/top", PopularControllers.getTop);

router.get("/popular/brands", PopularControllers.getBrandCount);

router.get("/popular/report/:email", PopularControllers.sendEmail);

module.exports = router;
