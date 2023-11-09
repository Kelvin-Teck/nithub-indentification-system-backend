const helpers = require("../config/helpers");

const authorize = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization)
    return helpers.newError(
      "you do not have the clearance to perform this operation",
      403
    );

  const token = authorization.split(" ")[1];

  helpers.verifyAccessToken(token);
};

module.exports = authorize;
