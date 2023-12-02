const mongoose = require("mongoose");
const { Schema } = mongoose;
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
  // username: {
  //   type: String,
  //   required: [true, "username must be required"],
  //   minLength: [3, "username must be at least 3 char"],
  //   maxLength: [15, "username must be less than 15 char"],
  //   unique: [true, "username must be unique"],
  // },
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
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
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
        // username: this.username,
        email: this.email,
        role: this.role,
        isActive: this.isActive,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
