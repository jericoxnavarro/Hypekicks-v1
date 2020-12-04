const express = require("express");
const router = express.Router();
const Brands = require("../models/Brands.model");
const Popular = require("../models/Popular.model");

router.get("/search", async (req, res) => {
  try {
    await Brands.find({}, async (err, data) => {
      let getObj = [];
      const popular = await Popular.find();
      let getArr = data[0].sneakers.concat(
        data[1].sneakers,
        data[2].sneakers,
        data[3].sneakers,
        data[4].sneakers,
        data[5].sneakers,
        popular[0].sneakers
      );
      for (let i = 0; i < getArr.length; i++) {
        if (
          getArr[i].shoeName
            .toLowerCase()
            .includes(req.query.query.toLocaleLowerCase())
        ) {
          getObj.push(getArr[i]);
        } else if (
          getArr[i].shoeName.toLowerCase() ===
          req.query.query.toLocaleLowerCase()
        ) {
          getObj.push(getArr[i]);
        } else if (
          getArr[i].styleID
            .toLowerCase()
            .includes(req.query.query.toLocaleLowerCase())
        ) {
          getObj.push(getArr[i]);
        } else if (
          getArr[i].styleID.toLowerCase() ===
          req.query.query.toLocaleLowerCase()
        ) {
          getObj.push(getArr[i]);
        }
      }
      res.json(getObj);
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
