const productModel = require("../model/productModel");
const sendResponse = require("../utils");
const AppError = require("../utils/appError");

let products = [
  {
    title: "ttttttttttttttttttt",
    price: 1000,
    image: "http://localhost:3040/Logo.svg",
  },
];

const getAllProducts = async (req, res, next) => {
  try {
    // data base getAllproduct
    let dbProducts = await productModel.find();

    sendResponse(res, {
      msg: "data retreived ",
      data: dbProducts,
    });
  } catch (err) {
    console.log("🚀 ~ getAllProducts ~ err:", err);
    next(err);
  }

  //   res.sendFile("./");
};

const getOneProduct = async (req, res) => {
  console.log(req.id);
  console.log(req.query);
  try {
    const prod = await productModel.findById(req.id);

    sendResponse(res, {
      msg: "data retreived ",
      data: prod,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }

  //   res.sendFile("./");
};
const createProduct = async (req, res, next) => {
  console.log(req.params);
  console.log(req.query);

  //
  console.log(req.body);
  try {
    const newProd = new productModel(req.body);

    await newProd.save();

    // await productModel.create(req.body);

    sendResponse(res, {
      status: 201,
      msg: "data created successfully ",
    }); //   res.sendFile("./");
  } catch (e) {
    next(e);
  }
};
const deleteProduct = async (req, res) => {
  try {
    // await productModel.deleteOne({ _id: req.id });
    let data = await productModel.findByIdAndDelete(req.id);

    sendResponse(res, {
      status: 200,
      msg: "elm deleted successfully ",
      data,
    }); //   res.sendFile("./");
  } catch (e) {
    next(e);
  }
  //   res.sendFile("./");
};
const updateProduct = async (req, res) => {
  try {
    // await productModel.deleteOne({ _id: req.id });
    let data = await productModel.findByIdAndUpdate(req.id, req.body);

    sendResponse(res, {
      status: 200,
      msg: "elm updated successfully ",
      data,
    }); //   res.sendFile("./");
  } catch (e) {
    next(e);
  }
  //   res.sendFile("./");
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
