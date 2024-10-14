const express = require("express");
const app = express();

// controller imports here
const { getTopics } = require("./controllers/topics-controller");

app.use(express.json());

app.get("/api/topics", getTopics);

// error-handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

// catch-all route handler for invalid routes
app.use((req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
