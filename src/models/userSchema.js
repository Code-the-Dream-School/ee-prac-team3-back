const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "name must be required"],
    minLength: [3, "name must be at least 3 char"],
    maxLength: [15, "name must be less than 15 char"],
  },
  lastname: {
    type: String,
    required: [true, "lastname must be required"],
    minLength: [3, "lastname must be at least 3 char"],
    maxLength: [15, "lastname must be less than 15 char"],
  },

  email: {
    type: String,
    required: [true, "email must be required"],
    unique: [true, "email has already registred"],
  },
  password: {
    type: String,
    required: [true, "password must be required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiryDate: {
    type: Date,
  },
});
{
  timestamps: true;
}
//hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

//method for generate token
userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      {
        id: this._id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        role: this.role,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
  //userSchema method for generating and return forgotPassword token
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString("hex");
    //step 1 - save to DB
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    /// forgot password expiry date
    this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min

    //step 2 - return values to user
    return forgotToken;
  },
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
