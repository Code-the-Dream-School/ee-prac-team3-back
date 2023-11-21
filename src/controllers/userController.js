const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");

/******************************************************
 * @SIGNUP
 * @route /api/v1/signup
 * @method POST
 * @description singUp function for creating new user
 * @body firstname,lastname,username,email, password
 * @returns User Object
 ******************************************************/

const signUp = async (req, res) => {
  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    //verify is user is already exists
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/******************************************************
 * @LOGIN
 * @route /api/v1/login
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!email || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //create token

    const token = user.jwtToken();
    user.password = undefined;
    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookiesOptions);

    return res.status(200).json({
      success: true,
      message: "User Successfuly Sign",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @LOGOUT
 * @route /api/v1/logout
 * @method GET
 * @description Remove the token form  cookie
 * @returns logout message and cookie without token
 ******************************************************/

const logOut = (req, res) => {
  try {
    const cookiesOptions = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @UPDATEUSER
 * @route /api/v1/updateuser
 * @method PUT
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user; //retrieve user.id from jwtverify()
    const user = await userModel.findByIdAndUpdate(userId, req.body);
    return res.status(200).json({
      success: true,
      message: "User update successfuly",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User not found ",
    });
  }
};

/******************************************************
 * @DELETEUSER
 * @route /api/v1/deleteuser
 * @method DELETE
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/

const deleteUser = async (req, res) => {
  const { userId } = req.user; //retrieve user.id from jwtverify()
  try {
    const user = await userModel.findByIdAndDelete(userId);
    return res.status(200).json({
      success: true,
      message: "User deleted successfuly",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User not found ",
    });
  }
};

module.exports = { signUp, logIn, logOut, updateUser, deleteUser };
