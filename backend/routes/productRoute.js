const express = require('express');
const productController = require('./../controller/productController')

const router = express.Router()


router.route('/seedData').get(productController.fetchAndSeedData)

router.route('/').get(productController.getAllProducts)

router.route('/stats/:month').get(productController.productsStats)

module.exports = router;
