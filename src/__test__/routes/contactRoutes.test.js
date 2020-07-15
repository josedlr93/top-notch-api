const supertest = require('supertest');
const app = require('../../app');

describe("GET / ", () => {
  test("It should respond", async done => {
    const response = await supertest(app).get("/");
    console.log(response);
    expect(response.status).toBe(200);
    done();
  });
});