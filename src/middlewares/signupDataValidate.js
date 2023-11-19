const emailValidator = require("email-validator");
const signupDataValidate = (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;
  //Verify if every field is fullled

  if (!firstname || !lastname || !email || !username || !password) {
    return res.status(400).json({
      success: false,
      message:
        "The following fields are required: firstname,lastname,username, email, password",
    });
  }
  //verify if email is valid
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid Email",
    });
  }

  next();
};

module.exports = signupDataValidate;
