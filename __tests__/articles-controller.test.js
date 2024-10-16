const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));

afterAll(() => {
  return db.end();
});

describe("GET /api/articles/:article_id", () => {
  test("should respond with a 200 status code when an article exists and has all required properties", () => {
    const validArticleId = 1;
    return request(app)
      .get(`/api/articles/${validArticleId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.article).toHaveProperty(
          "article_id",
          validArticleId
        );
        expect(response.body.article).toHaveProperty(
          "author",
          expect.any(String)
        );
        expect(response.body.article).toHaveProperty(
          "title",
          expect.any(String)
        );
        expect(response.body.article).toHaveProperty(
          "body",
          expect.any(String)
        );
        expect(response.body.article).toHaveProperty(
          "created_at",
          expect.any(String) // WHAT IS HAPPENING HERE? In the data, created_at is a number (e.g. created_at: 1589418120000) but to pass the test I have to expect a string???
        );
        expect(response.body.article).toHaveProperty(
          "votes",
          expect.any(Number)
        );
      });
  });

  test("should respond with a 404 status if an article with the given id does not exist", () => {
    const invalidArticleId = 111;
    return request(app)
      .get(`/api/articles/${invalidArticleId}`)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article not found");
      });
  });

  test("should respond with a 404 status for invalid routes", () => {
    return request(app)
      .get("/api/doesnotexist")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Route not found");
      });
  });

  test("should respond with a 400 status for invalid article id", () => {
    return request(app)
      .get("/api/articles/one-hundred")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid article ID");
      });
  });
});
