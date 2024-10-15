const {
  fetchArticles,
  fetchArticleById,
} = require("../models/articles-models");

// getArticles()
exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      next(err);
    });
};

// getArticlesByID()
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params; // get article_id from req.params

  // check if article_id is a valid number
  if (isNaN(Number(article_id))) {
    const error = new Error("Invalid article ID");
    error.statusCode = 400;
    return next(error);
  }

  // if valid, proceed with fetching the article (also return error if not found)
  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        const error = new Error("Article not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ article });
    })
    .catch((err) => {
      next(err);
    });
};
