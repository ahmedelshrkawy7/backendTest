var jwt = require("jsonwebtoken");
const joi = require("joi");
const AppError = require("../utils/appError");
const { ensureIndexes } = require("../model/productModel");
const sendResponse = require("../utils");
const userModel = require("../model/userMode");
const bcrypt = require("bcryptjs");

const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(2).max(20).required(),
});

const signIn = async (req, res, next) => {
  // req.body -->< email password 1234
  const { email, password } = req.body;
  const { error } = signinSchema.validate(req.body);

  if (!error) {
    var token = jwt.sign(
      { name: "ahmed", role: "admin" },
      process.env.PRIVATE_KEY,
    );
    try {
      let user = await userModel
        .findOne({ email })
        .populate("products", "title price -_id");
      if (!user) {
        next(new Error("user not found"));
      }
      let result = await bcrypt.compare(password, user.password);
      if (!result) {
        next(new Error("user or password is incorrect"));
      }
      res.json(user);
      console.log(user);
    } catch (err) {
      next(err);
    }
  }

  next(new AppError(JSON.stringify(error.details), 422));
};
const signup = async (req, res, next) => {
  const { password, ...rest } = req.body;
  let hashedPasssword = await bcrypt.hash(password, 10);

  try {
    let user = await userModel.create({
      ...rest,
      password: hashedPasssword,
    });
    sendResponse(res, {
      status: 201,
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signIn,
  signup,
};
