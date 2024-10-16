const express = require("express");
const app = express();

app.use(express.json());

// controller imports
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

// error-handling middleware

// catch-all for undefined routes (404)
app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
  err.msg = "Route not found";
  next(err);
});

// handles errors with specific status codes (e.g., 400, 404)
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err); // Move to the next error handler
});

// PostgreSQL-specific error handling
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err); // Pass to the generic error handler
});

// generic error handler for internal server errors (500)
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
