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
    // req.user = {
    //   userId: payload.id,
    //   email: payload.email,
    //   firstname: payload.firstname,
    //   lastname: payload.lastname,
    //   username: payload.username,
    //   role: payload.role,
    //   isActive: payload.isActive,
    //   accessToken: token,
    // };

    res.status(200).json({
      userId: payload.id,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      username: payload.username,
      role: payload.role,
      isActive: payload.isActive,
      accessToken: token,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authenticateUser;
