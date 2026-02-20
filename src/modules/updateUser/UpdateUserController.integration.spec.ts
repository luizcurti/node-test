import { app } from "../../app";
import request from "supertest";

describe("Update User Controller", () => {
  it("Should update a user", async () => {
    const created = await request(app).post("/users").send({
      username: "updateuser",
      email: "updateuser@test.com",
      name: "Update User",
    });

    const response = await request(app)
      .put(`/users/${created.body.id}`)
      .send({ name: "Updated Name" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Updated Name");
  });

  it("Should return 422 when body is empty", async () => {
    const created = await request(app).post("/users").send({
      username: "updateuserempty",
      email: "updateuserempty@test.com",
      name: "Update User Empty",
    });

    const response = await request(app).put(`/users/${created.body.id}`).send({});

    expect(response.status).toBe(422);
  });

  it("Should return 404 when user does not exist", async () => {
    const response = await request(app)
      .put("/users/nonexistent-id")
      .send({ name: "Ghost" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });
});
