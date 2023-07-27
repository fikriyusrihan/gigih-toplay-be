import express from 'express';
import CommentController from '../../../controllers/comment.controller.js';
import CommentService from '../../../services/comment.service.js';
import Comment from '../../../models/comment.model.js';

const router = express.Router();

const commentService = new CommentService(Comment);
const commentController = new CommentController(commentService);

router
  .route('/:videoId/comments')
  .post(commentController.handlePostComment)
  .get(commentController.handleGetCommentsByVideoId);

export default router;
