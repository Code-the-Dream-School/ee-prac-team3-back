const loginDataValidate = (req, res, next) => {
  const { email, password } = req.body;
  //verify if every field is fulled

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }
  next();
};
module.exports = loginDataValidate;
