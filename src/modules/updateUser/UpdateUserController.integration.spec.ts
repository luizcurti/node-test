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

  it("Should return 409 when new username is already in use", async () => {
    await request(app).post("/users").send({
      username: "existingusername409",
      email: "existing409@test.com",
      name: "Existing User",
    });
    const target = await request(app).post("/users").send({
      username: "targetuser409",
      email: "target409@test.com",
      name: "Target User",
    });

    const response = await request(app)
      .put(`/users/${target.body.id}`)
      .send({ username: "existingusername409" });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error", "Username already in use");
  });

  it("Should update only the email field", async () => {
    const created = await request(app).post("/users").send({
      username: "emailupdateuser",
      email: "oldemail@test.com",
      name: "Email Update User",
    });

    const response = await request(app)
      .put(`/users/${created.body.id}`)
      .send({ email: "newemail@test.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "newemail@test.com");
    expect(response.body).toHaveProperty("username", "emailupdateuser");
  });
});
