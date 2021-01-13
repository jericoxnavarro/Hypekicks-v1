const express = require("express");
const router = express.Router();
const verify = require("../controllers/Verify.token");

const UserControllers = require("../controllers/User.controllers");

// Get all users
router.get("/users", UserControllers.getUsers);

// Get user
router.get("/user/:userID", verify, UserControllers.getUser);

// Get user favorites
router.get("/user/favorites/:userID", verify, UserControllers.getUserFavorites);

// Add user
router.post("/user/create", UserControllers.createUser);

// Update Favorites
router.put(
  "/user/updatefavorites/:userID",
  verify,
  UserControllers.updateUserFavorites
);

// Update Info
router.put("/user/updateinfo/:userID", verify, UserControllers.updateUserInfo);

// User log in
router.post("/user/login", UserControllers.userLogin);

module.exports = router;
