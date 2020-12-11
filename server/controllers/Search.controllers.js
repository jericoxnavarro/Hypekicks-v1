const Brands = require("../models/Brands.model");
const Popular = require("../models/Popular.model");

exports.getSearch = async (req, res) => {
  try {
    await Brands.find({}, async (err, data) => {
      // Check if theres an Error
      if (err) return res.json({ message: err });

      let Results = [];
      const query = req.query.query.replace(/%20/g, " ");
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      // Get All Data in the Database
      const popular = await Popular.find();
      let Data = data[0].sneakers.concat(
        data[1].sneakers,
        data[2].sneakers,
        data[3].sneakers,
        data[4].sneakers,
        data[5].sneakers,
        data[6].sneakers,
        data[7].sneakers,
        popular[0].sneakers
      );

      /*Loop into the Data and check the shoeName and 
          styleID if the query have the same Word*/
      for (let i = 0; i < Data.length; i++) {
        const shoeName = Data[i].shoeName.toLowerCase();
        const Query = query.toLocaleLowerCase();
        const styleID = Data[i].styleID.toLowerCase();
        if (shoeName.includes(Query)) {
          Results.push(Data[i]);
        } else if (shoeName === Query) {
          Results.push(Data[i]);
        } else if (styleID.includes(Query)) {
          Results.push(Data[i]);
        } else if (styleID === Query) {
          Results.push(Data[i]);
        }
      }

      // Check if theres a duplicated data using styleID
      const filteredResults = Results.reduce((shoe, current) => {
        const x = shoe.find((item) => item.styleID === current.styleID);
        if (!x) {
          return shoe.concat([current]);
        } else {
          return shoe;
        }
      }, []);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const pageLength = Math.ceil(filteredResults.length / limit);
      const resultSearch = filteredResults.slice(startIndex, endIndex);
      let next = 0;
      if (filteredResults.length <= limit) {
        next = 1;
      } else {
        next = page + 1;
      }
      if (page > pageLength) {
        return res.status(404).json({
          message: `Sorry, the page you're looking for doesn't exist.`,
          data: [],
          status: 404,
        });
      } else {
        return res.status(200).json({
          message: `Query ${query} is retrieved`,
          pageLength: pageLength,
          next: next,
          previous: page - 1,
          limit: limit,
          totalData: filteredResults.length,
          status: 200,
          data: resultSearch,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getSearchPricing = async (req, res) => {
  try {
    await Brands.find({}, async (err, data) => {
      // Check if theres an Error
      if (err) return res.json({ message: err });

      let Results = [];
      let getPricing = [];
      const query = req.query.query.replace(/%20/g, " ");
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      // Get All Data in the Database
      const popular = await Popular.find();
      let Data = data[0].sneakers.concat(
        data[1].sneakers,
        data[2].sneakers,
        data[3].sneakers,
        data[4].sneakers,
        data[5].sneakers,
        data[6].sneakers,
        data[7].sneakers,
        popular[0].sneakers
      );

      /*Loop into the Data and check the shoeName and 
          styleID if the query have the same Word*/
      for (let i = 0; i < Data.length; i++) {
        const shoeName = Data[i].shoeName.toLowerCase();
        const Query = query.toLocaleLowerCase();
        const styleID = Data[i].styleID.toLowerCase();
        if (shoeName.includes(Query)) {
          Results.push(Data[i]);
        } else if (shoeName === Query) {
          Results.push(Data[i]);
        } else if (styleID.includes(Query)) {
          Results.push(Data[i]);
        } else if (styleID === Query) {
          Results.push(Data[i]);
        }
      }

      // Loop into the Results and check the lowestResellPrice if not equal to 0
      for (let i = 0; i < Results.length; i++) {
        if (Results[i].lowestResellPrice[req.params.sellerName] != 0) {
          getPricing.push(Results[i]);
        }
      }

      // Check if theres a duplicated data
      const filteredPricing = getPricing.reduce((shoe, current) => {
        const x = shoe.find((item) => item.styleID === current.styleID);
        if (!x) {
          return shoe.concat([current]);
        } else {
          return shoe;
        }
      }, []);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const pageLength = Math.ceil(filteredPricing.length / limit);
      const resultSearch = filteredPricing.slice(startIndex, endIndex);
      let next = 0;

      if (filteredPricing.length <= limit) {
        next = 1;
      } else {
        next = page + 1;
      }
      if (page > pageLength) {
        return res.status(404).json({
          message: `Sorry, the page you're looking for doesn't exist.`,
          data: [],
          status: 404,
        });
      } else {
        return res.status(200).json({
          message: `Query ${query} is retrieved via pricing`,
          pageLength: pageLength,
          next: next,
          previous: page - 1,
          limit: limit,
          totalData: filteredPricing.length,
          status: 200,
          data: resultSearch,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
