const express = require('express')
const { getAllProduct, createProduct, getSingleProduct, deleteProduct, updateProduct, uploadImage } = require('../controllers/product.controller')

const router = express.Router()

router.route('/').get(getAllProduct).post(createProduct)
router.post('/upload', uploadImage)
router.route('/:id').get(getSingleProduct).delete(deleteProduct).patch(updateProduct)


module.exports = router 

