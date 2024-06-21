const axios = require("axios");
const Product = require("./../model/productModel");

exports.fetchAndSeedData = async (req, res, next) => {
  const response = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  const products = response.data;

  for (const product of products) {
    await Product.create(product);
  }

  res.status(201).json({
    status: "success",
    message: "data inserted successfully!",
  });
};

exports.getAllProducts = async (req, res, next) => {
  const products = new ApiFeatures(Product.find(), req.query)
    .pagination()
    .search();

  const results = await products.query;

  res.status(200).json({
    status: "success",
    results: results.length,
    data: {
      results,
    },
  });
};