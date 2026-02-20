import { app } from "../../app";
import request from "supertest";

describe("List Users Controller", () => {
  it("Should return an array of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
