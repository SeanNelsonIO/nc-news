const express = require("express");
const app = express();

// controller imports here
const { getTopics } = require("./controllers/topics-controller");
const { getApiEndpoints } = require("./controllers/api-controller");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles-controller");

// routing
app.get("/api/topics", getTopics);
app.get("/api", getApiEndpoints);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

// error-handling middleware
// changed to default to 500 at all times unless otherwise specified
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ msg: message });
});

// catch-all route handler for invalid routes
app.use((req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
