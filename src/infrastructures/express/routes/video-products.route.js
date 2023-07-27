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

/**
 * @swagger
 * tags:
 *   name: Video's Products
 *   description: Video Products management and retrieval
 */

/**
 * @swagger
 * /videos/{videoId}/products:
 *   post:
 *     summary: Add a product to a video
 *     tags: [Video's Products]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           required: true
 *           description: The video id
 *           example: 5f8f8c8f1f6b1e2b9c1c0c9d
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product id
 *                 example: 5f8f8c8f1f6b1e2b9c1c0c9d
 *     responses:
 *       201:
 *         description: The product was successfully added to the video
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   example: Product added to video successfully
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *   delete:
 *     summary: Delete a product from a video
 *     tags: [Video's Products]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           required: true
 *           description: The video id
 *           example: 5f8f8c8f1f6b1e2b9c1c0c9d
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product id
 *                 example: 5f8f8c8f1f6b1e2b9c1c0c9d
 *     responses:
 *       200:
 *         description: The product was successfully deleted from the video
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   example: Product deleted from video successfully
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 */
