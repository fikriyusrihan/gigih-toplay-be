import express from 'express';
import UserController from '../../../controllers/user.controller.js';
import User from '../../../models/user.model.js';
import UserService from '../../../services/user.service.js';

const router = express.Router();

const userService = new UserService(User);
const userController = new UserController(userService);

router
  .route('/login')
  .post(userController.handlePostLogin);

router
  .route('/register')
  .post(userController.handlePostRegister);

router
  .route('/users/me')
  .get(userController.handleGetUser);

export default router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Authentication & retrieval
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the application
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: fikriyusrihan
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: secret
 *     responses:
 *       200:
 *         description: The user was successfully logged in
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
 *                   example: User logged in successfully
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                       description: The token of the user, please save it for future use
 *       401:
 *         description: Username or password is incorrect
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
 *                   example: Username or password is incorrect
 *                   description: The message of the response
 * /register:
 *   post:
 *     summary: Register to the application
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: fikriyusrihan@gmail.com
 *                 required: true
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: secret
 *                 required: true
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: fikriyusrihan
 *                 required: true
 *     responses:
 *       201:
 *         description: The user was successfully registered
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
 *                   example: User registered successfully
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                       description: The token of the user, please save it for future use
 *       400:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: error
 *                   example: error
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   example: Username or email already exists
 *                   description: The message of the response
 *
 * /users/me:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *         description: Provided JWT token
 *         name: Authorization
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: The user profile
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
 *                   example: User profile retrieved successfully
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 5f8f8c8a3d1e8669b3c2d4b5
 *                       description: The id of the user
 *                     username:
 *                       type: string
 *                       example: fikriyusrihan
 *                       description: The username of the user
 *                     email:
 *                       type: string
 *                       example: fikriyusrihan@gmail.com
 *                       description: The email of the user
 */
