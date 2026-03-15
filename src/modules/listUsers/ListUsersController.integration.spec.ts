import { app } from "../../app";
import request from "supertest";

describe("List Users Controller", () => {
  it("Should return an array of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should return users that were created", async () => {
    await request(app).post("/users").send({
      username: "listtest1",
      email: "listtest1@test.com",
      name: "List Test One",
    });
    await request(app).post("/users").send({
      username: "listtest2",
      email: "listtest2@test.com",
      name: "List Test Two",
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    const usernames = response.body.map((u: { username: string }) => u.username);
    expect(usernames).toContain("listtest1");
    expect(usernames).toContain("listtest2");
  });
});
