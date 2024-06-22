const axios = require("axios");
const Product = require("./../model/productModel");
const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.fetchAndSeedData = catchAsync(async (req, res, next) => {
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
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
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
});

exports.productsStats = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const stats = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, month],
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$dateOfSale" } },
        totalSaleAmount: { 
          $sum: { 
            $cond: [{ $eq: ["$sold", true] }, "$price", 0] 
          } 
        },
        totalSoldItems: { 
          $sum: { 
            $cond: [{ $eq: ["$sold", true] }, 1, 0] 
          } 
        },
        totalNotSoldItems: { 
          $sum: { 
            $cond: [{ $eq: ["$sold", false] }, 1, 0] 
          } 
        },
      },
    },
    {
      $addFields: { month: "$_id.month" },
    },
    {
      $project: { _id: 0 } // Hide the _id field
    }
  ]);

  res.status(200).json({
    status: "success",
    data: stats[0] || {},
  });
});
