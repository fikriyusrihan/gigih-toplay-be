import httpStatus from 'http-status';
import handlerWrapper from '../utils/handlerWrapper.js';

class CommentController {
  constructor(commentService) {
    this.commentService = commentService;

    this.handlePostComment = this.handlePostComment.bind(this);
    this.handleGetCommentsByVideoId = this.handleGetCommentsByVideoId.bind(this);
  }

  handlePostComment = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const comment = await this.commentService.createComment(videoId, req.body);
    const response = {
      status: 'success',
      message: 'Comment successfully created',
      data: comment,
    };

    res.status(httpStatus.CREATED).json(response);
  });

  handleGetCommentsByVideoId = handlerWrapper(async (req, res) => {
    const { videoId } = req.params;
    const { page, limit } = req.query;

    const query = {
      videoId,
    };

    const comments = await this.commentService.getCommentsByVideoId(
      query,
      { page, limit, sort: { timestamp: 'desc' } },
    );

    const response = {
      status: 'success',
      message: 'Comments successfully retrieved',
      data: comments,
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default CommentController;
