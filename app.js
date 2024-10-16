const express = require("express");
const app = express();

// controller imports here
const { getTopics } = require("./controllers/topics-controller");
const { getApiEndpoints } = require("./controllers/api-controller");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles-controller");
const { getCommentsByArticleId } = require("./controllers/comments-controller");

// routing
app.get("/api/topics", getTopics);
app.get("/api", getApiEndpoints);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

// catch-all route handler for invalid routes
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// error-handling middleware

app.use((err, req, res, next) => {
  // handle PostgreSQL invalid_text_representation error with code "22P02"
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "Invalid article ID" });
  }

  // general error handling (fallback)
  if (err.status) {
    return res.status(err.status).send({ msg: err.msg || err.message });
  }

  // catch-all for unexpected errors
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).send({ msg: message });
});

module.exports = app;
