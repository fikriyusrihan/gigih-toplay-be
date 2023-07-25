import express from 'express';
import VideoProductsService from '../../../services/video-products.service.js';
import Product from '../../../models/product.model.js';
import Video from '../../../models/video.model.js';
import VideoProductsController from '../../../controllers/video-products.controller.js';

const router = express.Router();

const videoProductsService = new VideoProductsService(Product, Video);
const videoProductsController = new VideoProductsController(videoProductsService);

router
  .route('/:videoId/products')
  .post(videoProductsController.handlePostVideoProduct)
  .delete(videoProductsController.handleDeleteVideoProduct);

export default router;
