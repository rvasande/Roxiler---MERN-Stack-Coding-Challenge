const express = require('express');
const productController = require('./../controller/productController')

const router = express.Router()


router.route('/seedData').get(productController.fetchAndSeedData)




module.exports = router;
