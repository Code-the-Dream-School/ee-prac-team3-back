const userModel = require("../models/userSchema");
const adminRole = async (req, res, next) => {
  const { role, userId } = req.user;
  try {
    if (role !== "admin") {
      await userModel.findByIdAndUpdate(userId, { role: "admin" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
  next();
};

module.exports = adminRole;
