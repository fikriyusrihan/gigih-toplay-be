import express from 'express';
import CommentController from '../../../controllers/comment.controller.js';
import CommentService from '../../../services/comment.service.js';
import Comment from '../../../models/comment.model.js';

const router = express.Router();

const commentService = new CommentService(Comment);
const commentController = new CommentController(commentService);

router
  .route('/:videoId/comments')
  .post(commentController.handlePostComment)
  .get(commentController.handleGetCommentsByVideoId);

export default router;

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management and retrieval
 */

/**
 * @swagger
 * /videos/{videoId}/comments:
 *   post:
 *     summary: Add a comment to a video
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           description: The video id
 *           example: 5f8f8c8f1f6b1e2b9c1c0c9d
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentRequest'
 *     responses:
 *       201:
 *         description: The comment was successfully added to the video
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
 *                   example: Comment created successfully
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *   get:
 *     summary: Retrieve the list of comments of a video
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           description: The video id
 *           example: 5f8f8c8f1f6b1e2b9c1c0c9d
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number
 *           example: 1
 *           default: 1
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: The limit of comments per page
 *           example: 10
 *           default: 10
 *         required: false
 *     responses:
 *       200:
 *         description: The list of comments of a video
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
 *                   example: Comments retrieved successfully
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
 *                     totalItems:
 *                       type: integer
 *                       example: 1
 *                       description: The total number of comments
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                       description: The total number of pages
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                       description: The limit of comments per page
 *                     page:
 *                       type: integer
 *                       example: 1
 *                       description: The current page
 */
