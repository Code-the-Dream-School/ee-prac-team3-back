const JWT = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  // verify if token is present or not
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized",
    });
  }
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    res.status(200).json({
      id: payload.id,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
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
