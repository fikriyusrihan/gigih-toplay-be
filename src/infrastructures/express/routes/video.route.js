import express from 'express';
import VideoService from '../../../services/video.service.js';
import Video from '../../../models/video.model.js';
import VideoController from '../../../controllers/video.controller.js';

const router = express.Router();

const videoService = new VideoService(Video);
const videoController = new VideoController(videoService);

router
  .route('/')
  .post(videoController.handlePostVideo)
  .get(videoController.handleGetVideos);

router
  .route('/seed')
  .get(videoController.handleGetSeedVideos);

router
  .route('/:videoId')
  .get(videoController.handleGetVideoById)
  .put(videoController.handlePutVideoById)
  .delete(videoController.handleDeleteVideoById);

export default router;

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management and retrieval
 */

/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoRequest'
 *     responses:
 *       201:
 *         description: The video was successfully created
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
 *                   example: Video created successfully
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *   get:
 *     summary: Retrieve the list of videos
 *     tags: [Videos]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           description: The video's title
 *           example: Tokopedia
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number
 *           example: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: The number of items per page
 *           example: 10
 *           default: 10
 *     responses:
 *       200:
 *         description: The list of videos
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
 *                   example: Videos successfully retrieved
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Video'
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
 * /videos/{videoId}:
 *   get:
 *     summary: Retrieve a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           description: The auto-generated id of the video
 *           example: 5f8f8c8a3d1e8669b3c2d4b5
 *           required: true
 *     responses:
 *       200:
 *         description: The video was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: The video was not found
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
 *                   example: Video not found
 *                   description: The message of the response
 *   put:
 *     summary: Update a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           description: The auto-generated id of the video
 *           example: 5f8f8c8a3d1e8669b3c2d4b5
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoRequest'
 *     responses:
 *       200:
 *         description: The video was successfully updated
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
 *                   example: Video successfully updated
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *   delete:
 *     summary: Delete a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *           description: The auto-generated id of the video
 *           example: 5f8f8c8a3d1e8669b3c2d4b5
 *         required: true
 *     responses:
 *       200:
 *         description: The video was successfully deleted
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
 *                   example: Video successfully deleted
 *                   description: The message of the response
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 */
