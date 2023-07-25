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
  .route('/:videoId')
  .get(videoController.handleGetVideoById)
  .put(videoController.handlePutVideoById)
  .delete(videoController.handleDeleteVideoById);

export default router;
