const User = require("../models/User.model");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ data: users, message: "All Users is retrived", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getUser = async (req, res) => {
  // Check User ID if match
  if (req.params.userID != req.user._id)
    return res.status(401).json({ message: "User Access Denied", status: 401 });

  try {
    const user = await User.findById(req.params.userID);
    return res.status(200).json({
      user: user,
      message: `USer is Connected`,
      status: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getUserFavorites = async (req, res) => {
  // Check User ID if match
  if (req.params.userID != req.user._id)
    return res.status(401).json({ message: "User Access Denied", status: 401 });

  try {
    const user = await User.findById(req.params.userID);
    return res.status(200).json({
      data: user.favorites,
      message: `User ${user.username} favorites is retrived`,
      status: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.updateUserFavorites = async (req, res) => {
  // Check User ID if match
  if (req.params.userID != req.user._id)
    return res.status(401).send({ message: "User Access Denied", status: 401 });

  try {
    const userID = req.params.userID;
    const updateFavorites = await User.updateOne(
      { _id: userID },
      { $push: { favorites: [req.body.sneaker] } }
    );
    return res.status(200).json({
      data: updateFavorites,
      message: `User ${userID} favorites is updated`,
      status: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.createUser = async (req, res) => {
  const validationCreate = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    address: Joi.string().min(6).required(),
  });

  // Request Validations
  const { error } = validationCreate.validate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: "none",
      statusCode: 400,
    });

  // Check if email exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(409).send({
      message: `"Email already exists`,
      status: "none",
      statusCode: 409,
    });

  // Check if username exists
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(409).send({
      message: `"Username already exists`,
      status: "none",
      statusCode: 409,
    });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    fullname: req.body.fullname,
    email: req.body.email,
    address: req.body.address,
    favorites: [],
  });

  try {
    const saveUser = await user.save();
    return res
      .status(200)
      .json({ user: user._id, message: `"User Created`, statusCode: 200 });
  } catch (err) {
    res.status(400).send({ message: err, status: "none", statusCode: 400 });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const validationLogin = Joi.object({
      username: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    // Request Validations
    const { error } = validationLogin.validate(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
        status: "none",
        statusCode: 400,
      });

    // Check if username exists
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(409).send({
        message: `"Username or Password is wrong`,
        status: "none",
        statusCode: 409,
      });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(403).send({
        message: `"Invalid Password`,
        status: "none",
        statusCode: 403,
      });

    // Create and assign token
    const payload = {
      _id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).header("auth-token", token).send({
      token: token,
      _id: user._id,
      message: `User verified`,
      status: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
