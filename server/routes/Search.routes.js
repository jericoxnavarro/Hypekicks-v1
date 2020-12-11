const express = require("express");
const router = express.Router();

const SearchControllers = require("../controllers/Search.controllers");

router.get("/search", SearchControllers.getSearch);

router.get("/search/pricing/:sellerName", SearchControllers.getSearchPricing);

module.exports = router;
