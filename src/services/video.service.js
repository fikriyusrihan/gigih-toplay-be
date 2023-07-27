import httpStatus from 'http-status';
import ApiError from '../utils/error/ApiError.js';

class VideoService {
  constructor(video) {
    this.video = video;

    this.createVideo = this.createVideo.bind(this);
    this.queryVideos = this.queryVideos.bind(this);
    this.getVideoById = this.getVideoById.bind(this);
    this.updateVideoById = this.updateVideoById.bind(this);
    this.deleteVideoById = this.deleteVideoById.bind(this);
  }

  async createVideo(videoBody) {
    return this.video.create(videoBody);
  }

  async queryVideos(filter, options) {
    const customLabels = {
      docs: 'items',
      totalDocs: 'totalItems',
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: false,
      nextPage: false,
    };

    const result = await this.video.paginate(filter, { ...options, customLabels });
    delete result.false;

    return result;
  }

  async getVideoById(videoId) {
    const video = await this.video.findById(videoId);
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The requested video was not found');
    }

    return video;
  }

  async updateVideoById(videoId, videoBody) {
    const video = await this.getVideoById(videoId);

    Object.assign(video, videoBody);
    await video.save();

    return video;
  }

  async deleteVideoById(videoId) {
    const video = await this.getVideoById(videoId);

    await this.video.deleteOne({ _id: videoId });

    return video;
  }
}

export default VideoService;
