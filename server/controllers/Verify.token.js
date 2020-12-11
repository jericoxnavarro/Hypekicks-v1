const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ message: "Access Denied Token is not Authorize", status: 401 });

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid Token", status: 400 });
  }
};
