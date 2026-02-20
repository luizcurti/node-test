import { app } from "../../app";
import request from "supertest";

describe("Delete User Controller", () => {
  it("Should delete a user and return 204", async () => {
    const created = await request(app).post("/users").send({
      username: "deleteuser",
      email: "deleteuser@test.com",
      name: "Delete User",
    });

    const response = await request(app).delete(`/users/${created.body.id}`);

    expect(response.status).toBe(204);
  });

  it("Should return 404 when user does not exist", async () => {
    const response = await request(app).delete("/users/nonexistent-id");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });
});
