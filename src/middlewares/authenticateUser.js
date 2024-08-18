const JWT = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authentication required",
    });
  }

  try {
    const payload = JWT.verify(token, process.env.SECRET);

    // Attach the user data to the request object for further processing
    req.user = {
      userId: payload.id,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      role: payload.role,
      favorites: payload.favorites,
      avatarURL: payload.avatarURL,
      accessToken: token,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error.message); // Log the error for debugging
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateUser;
