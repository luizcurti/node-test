import { app } from "../../app";
import request from "supertest";

describe("Get User By Id Controller", () => {
  it("Should return a user by id", async () => {
    const created = await request(app).post("/users").send({
      username: "getuserbyid",
      email: "getuserbyid@test.com",
      name: "Get User By Id",
    });

    const response = await request(app).get(`/users/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", created.body.id);
  });

  it("Should return 404 when user does not exist", async () => {
    const response = await request(app).get("/users/nonexistent-id");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });
});
