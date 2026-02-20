import { app } from "../../app";
import request from "supertest";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      username: "testintegration",
      email: "testIntegration@test.com",
      name: "Test Integration",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    await request(app).post("/users").send({
      username: "testintegrationexist",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    const response = await request(app).post("/users").send({
      username: "testintegrationexist",
      email: "testIntegrationExisting@test.com",
      name: "Test Integration Exist User",
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error", "User already exists!");
  });
});
