class CommentService {
  constructor(comment) {
    this.comment = comment;
  }

  async createComment(videoId, commentBody) {
    const comment = {
      ...commentBody,
      videoId,
      timestamp: new Date().toISOString(),
    };

    return this.comment.create(comment);
  }

  async getCommentsByVideoId(filter, options) {
    const customLabels = {
      docs: 'items',
      totalDocs: 'totalItems',
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: false,
      nextPage: false,
    };

    const result = await this.comment.paginate(filter, { ...options, customLabels });
    delete result.false;

    return result;
  }
}

export default CommentService;
