const Popular = require("../models/Popular.model");

exports.getPopular = async (req, res) => {
  try {
    const popular = await Popular.find();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pageLength = Math.ceil(popular[0].sneakers.length / limit);
    const resultPopulars = popular[0].sneakers.slice(startIndex, endIndex);
    if (page > pageLength) {
      return res.status(404).json({
        message: `Sorry, the page you're looking for doesn't exist.`,
        data: false,
        status: 404,
      });
    } else if (page < 1) {
      return res.status(404).json({
        message: `Sorry, the page you're looking for doesn't exist.`,
        data: false,
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: `Popular page ${page} is retrieved`,
        pageLength: pageLength,
        next: page + 1,
        previous: page - 1,
        limit: limit,
        status: 200,
        dataLength: popular[0].sneakers.length,
        data: resultPopulars,
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.addPopular = async (req, res) => {
  const popular = new Popular({
    sneakers: req.body.sneakers,
  });
  try {
    const savePopular = await popular.save();
    return res
      .status(200)
      .json({ data: savePopular, message: "Popular added", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
