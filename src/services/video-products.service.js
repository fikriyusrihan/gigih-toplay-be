import httpStatus from 'http-status';
import ApiError from '../utils/error/ApiError.js';

class VideoProductsService {
  constructor(product, video) {
    this.product = product;
    this.video = video;

    this.insertProduct = this.insertProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  async insertProduct(videoId, productId) {
    const video = await this.video.findById(videoId);
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The requested video was not found');
    }

    const product = await this.product.findById(productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The requested product was not found');
    }

    video.products.push(product);
    await video.save();

    return video;
  }

  async removeProduct(videoId, productId) {
    const video = await this.video.findById(videoId);
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The requested video was not found');
    }

    const product = await this.product.findById(productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The requested product was not found');
    }

    // eslint-disable-next-line no-underscore-dangle
    const index = video.products.indexOf(product._id);
    if (index > -1) {
      video.products.splice(index, 1);
    }
    await video.save();

    return video;
  }
}

export default VideoProductsService;
