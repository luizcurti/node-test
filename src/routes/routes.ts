import { Router, Request, Response } from "express";
import { createUserFactory } from "../modules/createUser/CreateUserFactory";

const routes = Router();

routes.post("/users", async (request: Request, response: Response) => {
  try {
    await createUserFactory().handle(request, response);
  } catch (error) {
    response.status(500).json({ error: (error instanceof Error ? error.message : "Unknown error") });
  }
});

export { routes };
