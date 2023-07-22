import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  username: String,
  comment: String,
  timestamp: String,
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - username
 *        - comment
 *        - videoId
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the comment
 *        username:
 *          type: string
 *          description: The username of the comment writer
 *        comment:
 *          type: string
 *          description: The comment
 *        timestamp:
 *          type: string
 *          description: The timestamp of the comment
 *        videoId:
 *          type: string
 *          description: The id of commented video
 *      example:
 *        id: 5f8d0f4d7f4bba1d9c9bce1f
 *        username: tokopedia
 *        comment: Great product!
 *        timestamp: 2020-10-19T10:00:00.000Z
 *        videoId: 5f8d0f4d7f4bba1d9c9bce1f
 */
