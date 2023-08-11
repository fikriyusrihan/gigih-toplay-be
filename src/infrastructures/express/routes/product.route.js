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
  .route('/seed')
  .get(productController.handleGetSeedProducts);

router
  .route('/:productId')
  .get(productController.handleGetProductById)
  .put(productController.handlePutProductById)
  .delete(productController.handleDeleteProductById);

export default router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequest'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *   get:
 *     summary: Retrieve the list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           description: Product title
 *           example: Macbook Pro M1
 *           required: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number
 *           example: 1
 *           required: false
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of items per page
 *           example: 10
 *           required: false
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Products successfully retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     totalItems:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     page:
 *                       type: integer
 *                       example: 1
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Retrieve a single product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *           description: Product ID
 *           example: 60f0a9b0bbed863d9c4d3f3a
 *           required: true
 *     responses:
 *       200:
 *         description: A single product
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
 *                   example: Product successfully retrieved
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         description: Product ID
 *         example: 60f0a9b0bbed863d9c4d3f3a
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequest'
 *     responses:
 *       200:
 *         description: The product was successfully updated
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
 *                   example: Product successfully updated
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   example: Product not found
 *                   description: The message of the response
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         description: Product ID
 *         example: 60f0a9b0bbed863d9c4d3f3a
 *         required: true
 *     responses:
 *       200:
 *         description: The product was successfully deleted
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
 *                   example: Product successfully deleted
 *                   description: The message of the response
 *       404:
 *         description: The product was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   example: Product not found
 *                   description: The message of the response
 */
