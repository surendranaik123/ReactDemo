const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

//loginschema
const loginUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

//signup schema
const SignupUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// static login method
SignupUserSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  console.log(exists);

  if (!exists) {
    throw Error("Invalid user");
  }

  const matchPassword = await bcrypt.compare(password, exists.password);

  console.log("match", matchPassword);

  if (!matchPassword) {
    throw Error("Incorrect password");
  } else if (!exists.verified) {
    throw Error("First Verify your Email Account");
  } else {
    return exists;
  }
};

// static signup method
SignupUserSchema.statics.signup = async function (
  email,
  password,
  name,
  address,
  contact
) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    name,
    address,
    contact,
  });

  return user;
};

const loginUserModel = model("loginUser", loginUserSchema);
const SignupUserModel = model("SignupUser", SignupUserSchema);

module.exports = { SignupUserModel, loginUserModel };
