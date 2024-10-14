const { fetchArticleById } = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params; // get article_id from req.params

  // check if article_id is a valid number
  if (isNaN(Number(article_id))) {
    return res.status(400).json({ msg: "Invalid article ID" });
  }

  // if valid, proceed with fetching the article (also return error if not found)
  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        return res.status(404).json({ msg: "Article not found" });
      }
      res.status(200).json({ article });
    })
    .catch(next);
};
