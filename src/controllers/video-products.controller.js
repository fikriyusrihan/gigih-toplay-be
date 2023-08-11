import httpStatus from 'http-status';
import handlerWrapper from '../utils/api/handlerWrapper.js';

class VideoProductsController {
  constructor(videoProductsService) {
    this.videoProductsService = videoProductsService;

    this.handlePostVideoProduct = this.handlePostVideoProduct.bind(this);
    this.handleDeleteVideoProduct = this.handleDeleteVideoProduct.bind(this);
  }

  handlePostVideoProduct = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const { productId } = req.body;

    const video = await this.videoProductsService.insertProduct(videoId, productId);

    const response = {
      status: 'success',
      message: 'Product successfully inserted into the requested video',
      data: video,
    };

    res.status(httpStatus.CREATED).json(response);
  });

  handleDeleteVideoProduct = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const { productId } = req.body;

    const video = await this.videoProductsService.removeProduct(videoId, productId);

    const response = {
      status: 'success',
      message: 'Product successfully removed from the requested video',
      data: video,
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default VideoProductsController;
