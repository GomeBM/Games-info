const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token)
    return res.status(401).json({ message: "Access denied, no token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.attachedData = decoded; // Attach user data to the request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
