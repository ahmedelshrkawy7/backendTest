const express = require("express");
const path = require("node:path");
const prodRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const sendResponse = require("./utils");
const { writeFile, appendFile } = require("node:fs");
var morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
var cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(morgan());
app.use(
  cors({
    origin: "https://forever-ecommerce.vercel.app/",
  }),
);

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  const { token } = req.cookies;
  try {
    const decode = jwt.verify(token, "fasdfasdfasdfasdf");
    console.log("🚀 ~ decode:", decode);
    next();
  } catch (err) {
    next(new AppError("unauthenticated", 401));
  }
});

app.use("/api/v1/products", prodRouter);

app.use((req, res, next) => {
  appendFile("./logs.txt", `${req.method} on ${req.url}\n`, (err) => {
    console.log(err);
  });

  next();
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.all("/*splat", (req, res) => {
  sendResponse(res, {
    msg: "unmatched route",
    status: 404,
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    });
  } else {
    res.status(500).json({
      message: err.message,
      status: 500,
      err,
    });
  }
});

app.listen(5050, () => {
  console.log("server is running");
  mongoose
    .connect(
      // "mongodb://127.0.0.1:27017/depi5?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.9",
      process.env.DB_URL,
    )
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((e) => console.log(e));
});
