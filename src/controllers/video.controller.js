import httpStatus from 'http-status';
import handlerWrapper from '../utils/api/handlerWrapper.js';
import seed from '../utils/db/seed.js';

class VideoController {
  constructor(videoService) {
    this.videoService = videoService;

    this.handlePostVideo = this.handlePostVideo.bind(this);
    this.handleGetVideos = this.handleGetVideos.bind(this);
    this.handleGetVideoById = this.handleGetVideoById.bind(this);
    this.handlePutVideoById = this.handlePutVideoById.bind(this);
    this.handleDeleteVideoById = this.handleDeleteVideoById.bind(this);
    this.handleGetSeedVideos = this.handleGetSeedVideos.bind(this);
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
    let { title, page, limit } = req.query;

    if (!title) {
      title = '';
    }

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

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

  handleGetSeedVideos = handlerWrapper(async (req, res) => {
    await seed.seedVideos();
    const response = {
      status: 'success',
      message: 'Videos successfully seeded',
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default VideoController;
