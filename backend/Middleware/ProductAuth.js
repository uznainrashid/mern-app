const jwt = require("jsonwebtoken");


const ensureAuthorization = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorization, JWT token is required",
    });
  }
  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.users = decode;
    next()
  } catch (error) {
    return res.status(401).json({
        message: "Unauthorization, JWT token is wrong or expired",
      });
  }
};
module.exports = ensureAuthorization