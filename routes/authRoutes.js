const express = require("express");
const { signIn, signup } = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/signin", signIn);

authRouter.post("/signup", signup);

module.exports = authRouter;
