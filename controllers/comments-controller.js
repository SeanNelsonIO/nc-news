const { fetchArticleById } = require("../models/articles-models");
const { fetchCommentsByArticleId } = require("../models/comments-models");

// getCommentsByArticleId()
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then(() => {
      return fetchCommentsByArticleId(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
