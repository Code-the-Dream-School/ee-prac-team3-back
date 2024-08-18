const userModel = require("../models/userSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/******************************************************
 * @SIGNUP
 * @route /api/v1/signup
 * @method POST
 * @description Create a new user
 * @body firstname, lastname, username, email, password
 * @returns User Object
 ******************************************************/
const signUp = async (req, res) => {
  try {
    const userInfo = new userModel(req.body); // Use 'new' for model instantiation
    const result = await userInfo.save();
    return res.status(201).json({ // 201 Created is more appropriate
      success: true,
      data: result,
    });
  } catch (error) {
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
 * @description Verify user credentials and send JWT token in cookie
 * @body email, password
 * @returns User Object, cookie
 ******************************************************/
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ // 401 Unauthorized
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = JWT.sign({
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      favorites: user.favorites,
      avatarURL: user.avatarURL,
    }, process.env.SECRET, {
      expiresIn: '24h',
    });

    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: 'Strict', // Improve CSRF protection
    };
    res.cookie("token", token, cookiesOptions);

    return res.status(200).json({
      success: true,
      message: "User Successfully Signed In",
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          favorites: user.favorites,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @GETUSER
 * @route /api/v1/login
 * @method GET
 * @description Retrieve user data if JWT is valid
 * @returns User Object
 ******************************************************/
const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await userModel.findById(userId).populate("favorites");
    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @GETADMIN
 * @route /api/v1/admin
 * @method GET
 * @description Upgrade user to admin and set new JWT token
 * @returns User Object
 ******************************************************/
const getAdmin = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await userModel.findById(userId);
    const token = JWT.sign({
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: 'admin', // Update role to admin
      favorites: user.favorites,
      avatarURL: user.avatarURL,
    }, process.env.SECRET, {
      expiresIn: '24h',
    });

    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    };
    res.cookie("token", token, cookiesOptions);

    return res.status(200).json({
      success: true,
      message: "You are now an admin",
      data: user,
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
 * @description Remove JWT token from cookie
 * @returns Logout message and cookie without token
 ******************************************************/
const logOut = (req, res) => {
  try {
    const cookiesOptions = {
      expires: new Date(),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
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
 * @description Update user data
 * @body firstname, lastname, email, currentPassword, newPassword, avatarURL
 * @returns User Object
 ******************************************************/
const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { firstname, lastname, email, newPassword, currentPassword, avatarURL } = req.body;
    let hashedPassword;

    if (newPassword && currentPassword) {
      const user = await userModel.findById(userId);
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          avatarURL,
        },
        { new: true }
    );

    const token = JWT.sign({
      id: updatedUser._id,
      email: updatedUser.email,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      role: updatedUser.role,
      favorites: updatedUser.favorites,
      avatarURL: updatedUser.avatarURL,
    }, process.env.SECRET, {
      expiresIn: '24h',
    });

    const cookiesOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    };
    res.cookie("token", token, cookiesOptions);

    return res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @DELETEUSER
 * @route /api/v1/deleteuser
 * @method DELETE
 * @description Delete user and remove JWT token
 * @returns Deletion message and cookie without token
 ******************************************************/
const deleteUser = async (req, res) => {
  const { userId } = req.user;
  try {
    await userModel.findByIdAndDelete(userId);
    const cookiesOptions = {
      expires: new Date(),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    };
    res.cookie("token", null, cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  getUser,
  getAdmin,
  logOut,
  updateUser,
  deleteUser,
};