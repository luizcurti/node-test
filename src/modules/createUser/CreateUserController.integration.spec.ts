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

  it("Should not be able to create an existing user (duplicate username)", async () => {
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

  it("Should not be able to create user with duplicate email", async () => {
    await request(app).post("/users").send({
      username: "emailowner",
      email: "shared@email.com",
      name: "Email Owner",
    });

    const response = await request(app).post("/users").send({
      username: "emailowner2",
      email: "shared@email.com",
      name: "Email Owner 2",
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error", "User already exists!");
  });

  it("Should return 422 when required fields are missing", async () => {
    const response = await request(app).post("/users").send({ username: "onlyusername" });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error", "Validation error");
    expect(response.body).toHaveProperty("details");
  });

  it("Should return 422 when email format is invalid", async () => {
    const response = await request(app).post("/users").send({
      username: "validuser",
      email: "not-a-valid-email",
      name: "Valid Name",
    });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error", "Validation error");
  });
});
