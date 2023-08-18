const isAuth = (req, res, next) => {
  if (req.headers["x-acciojob"]) {
    next();
  } else {
    return res.send({
      status: 401,
      message: "User is not authenticated. Please login!",
    });
  }
};

module.exports = { isAuth };
