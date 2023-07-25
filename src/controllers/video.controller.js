import httpStatus from 'http-status';
import handlerWrapper from '../utils/handlerWrapper.js';

class VideoController {
  constructor(videoService) {
    this.videoService = videoService;
  }

  handlePostVideo = handlerWrapper(async (req, res) => {
    const video = await this.videoService.createVideo(req.body);
    const response = {
      status: 'success',
      message: 'Video successfully created',
      data: video,
    };

    res.status(httpStatus.CREATED).json(response);
  });

  handleGetVideos = handlerWrapper(async (req, res) => {
    const { title, page, limit } = req.query;

    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const result = await this.videoService.queryVideos(
      query,
      { page, limit },
    );

    const response = {
      status: 'success',
      message: 'Videos successfully retrieved',
      data: result,
    };

    res.status(httpStatus.OK).json(response);
  });

  handleGetVideoById = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const video = await this.videoService.getVideoById(videoId);
    const response = {
      status: 'success',
      message: 'Video successfully retrieved',
      data: video,
    };

    res.status(httpStatus.OK).json(response);
  });

  handlePutVideoById = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const video = await this.videoService.updateVideoById(videoId, req.body);
    const response = {
      status: 'success',
      message: 'Video successfully updated',
      data: video,
    };

    res.status(httpStatus.OK).json(response);
  });

  handleDeleteVideoById = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const video = await this.videoService.deleteVideoById(videoId);
    const response = {
      status: 'success',
      message: 'Video successfully deleted',
      data: video,
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default VideoController;
