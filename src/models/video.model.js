import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import toJSON from './plugins/toJSON.plugin.js';

const { Schema } = mongoose;

const metaSchema = new Schema({
  viewers_count: Number,
});

const streamerSchema = new Schema({
  username: String,
  display_name: String,
});

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  user: streamerSchema,
  meta: metaSchema,
});

videoSchema.plugin(mongoosePaginate);
videoSchema.plugin(toJSON);

const Video = mongoose.model('Video', videoSchema);

export default Video;

/**
 * @swagger
 * components:
 *   schemas:
 *     VideoRequest:
 *       type: object
 *       required:
 *         - title
 *         - video_url
 *       properties:
 *         title:
 *           type: string
 *           description: The video's title
 *         video_url:
 *           type: string
 *           description: The video's url
 *       example:
 *         title: Tokopedia
 *         video_url: https://www.youtube.com/watch?v=5Fb8xZiD4zI
 *     Video:
 *       type: object
 *       required:
 *         - title
 *         - video_url
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the video
 *         title:
 *           type: string
 *           description: The video's title
 *         video_url:
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
 *         video_url: https://www.youtube.com/watch?v=5Fb8xZiD4zI
 *         products: [5f8d0f4d7f4bba1d9c9bce1f, 5f8d0f4d7f4bba1d9c9bce1f]
 */
