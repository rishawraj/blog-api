const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWTSECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      console.log({ error: err });
      return res
        .status(403)
        .json({ message: "Failed to authenticate token", err: err });
    }

    // Add the decoded payload to the request object for future use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = verifyToken;
