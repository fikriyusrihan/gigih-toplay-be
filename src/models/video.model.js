import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoSchema = new Schema({
  title: String,
  url: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Video = mongoose.model('Video', videoSchema);

export default Video;

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - title
 *         - url
 *         - products
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the video
 *         title:
 *           type: string
 *           description: The video's title
 *         url:
 *           type: string
 *           description: The video's url
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             description: The id of the product
 *       example:
 *         id: 5f8d0f4d7f4bba1d9c9bce1f
 *         title: Tokopedia
 *         url: https://www.youtube.com/watch?v=5Fb8xZiD4zI
 *         products: [5f8d0f4d7f4bba1d9c9bce1f, 5f8d0f4d7f4bba1d9c9bce1f]
 */
