const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));

afterAll(() => {
  return db.end();
});

describe("GET/api/topics", () => {
  test("should respond with a 404 status when provided an invalid route", () => {
    const invalidUrls = [
      "/api/non-existent-route",
      "/api/topics/123/invalid",
      "/not-a-valid-api-route",
    ];

    return Promise.all(
      invalidUrls.map((url) => {
        return request(app)
          .get(url)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("Route not found");
          });
      })
    );
  });

  test("should respond with a 200 status code and an array of topics with 'slug' and 'description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const topicsArray = response.body.topics;

        // check that the response is an array
        expect(Array.isArray(topicsArray)).toBe(true);

        // check that each topic object has 'slug' and 'description'
        topicsArray.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});
