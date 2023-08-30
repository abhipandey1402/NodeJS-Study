const express = require("express");
const {
  followUser,
  getFollowingList,
  getFollowerList,
  unfollowUser,
} = require("../controllers/follow.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");

const router = express();

router.post("/followUser/:userid", isAuth, followUser);
router.get("/followingList", isAuth, getFollowingList);
router.get("/followerList", isAuth, getFollowerList);
router.post("/unfollowUser", isAuth, unfollowUser);

module.exports = router;
