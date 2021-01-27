const Popular = require("../models/Popular.model");
const nodemailer = require("nodemailer");

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

exports.getTop = async (req, res) => {
  try {
    const popular = await Popular.find();

    const resultPopulars = popular[0].sneakers.slice(0, 3);

    return res.status(200).json({
      message: `Popular top 3 retrieved`,
      data: resultPopulars,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getBrandCount = async (req, res) => {
  try {
    const popular = await Popular.find();

    const sneakers = popular[0].sneakers;
    let Nike = 0;
    let Adidas = 0;
    let Vans = 0;
    let Converse = 0;
    let NewBalance = 0;
    let Reebok = 0;
    let Others = 0;
    for (let i = 0; i < sneakers.length; i++) {
      if (sneakers[i].brand == "Jordan" || sneakers[i].brand == "Nike") {
        Nike = Nike + 1;
      } else if (sneakers[i].brand == "adidas") {
        Adidas = Adidas + 1;
      } else if (sneakers[i].brand == "Vans") {
        Vans = Vans + 1;
      } else if (sneakers[i].brand == "Converse") {
        Converse = Converse + 1;
      } else if (sneakers[i].brand == "New Balance") {
        NewBalance = NewBalance + 1;
      } else if (sneakers[i].brand == "Reebok") {
        Reebok = Reebok + 1;
      } else {
        Others = Others + 1;
      }
    }

    return res.status(200).json({
      data: {
        Nike: Nike,
        Adidas: Adidas,
        Vans: Vans,
        Converse: Converse,
        NewBalance: NewBalance,
        Reebok: Reebok,
        Others: Others,
      },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.Email, // sender address
    to: req.params.email, // list of receivers
    subject: `Hypekicks Report`,
    attachments: [
      {
        filename: `Report.html`,
        path: "./Data/Template.html",
      },
    ],
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) return res.status(400).send({ message: err, statusCode: 400 });
    else return res.status(200).send({ message: info, statusCode: 200 });
  });
};
