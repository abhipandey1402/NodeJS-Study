const express = require("express");
const router = express();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuth, logoutUser);

module.exports = router;
