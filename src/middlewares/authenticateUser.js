const JWT = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  // verify if token is present or not
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Not Authorized",
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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authenticateUser;
