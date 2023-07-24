import express from 'express';
import ProductController from '../../../controllers/product.controller.js';
import ProductService from '../../../services/product.service.js';
import Product from '../../../models/product.model.js';

const router = express.Router();

const productService = new ProductService(Product);
const productController = new ProductController(productService);

router
  .route('/')
  .post(productController.handlePostProduct)
  .get(productController.handleGetProducts);

router
  .route('/:productId')
  .get(productController.handleGetProductById)
  .put(productController.handlePutProductById)
  .delete(productController.handleDeleteProductById);

export default router;
