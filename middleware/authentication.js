const { UnauthenticatedError } = require("../errors");
const { validateToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("Authentication Failed ");
  }
  try {
    const { name, role, userId } = validateToken(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication Failed");
  }
};

module.exports = authenticateUser;
