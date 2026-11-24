const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("hello from users");
});
userRouter.post("/", (req, res) => {
  res.send("hello from users");
});

module.exports = userRouter;
