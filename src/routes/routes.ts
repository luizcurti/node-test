import { Router, Request, Response } from "express";
import { createUserFactory } from "../modules/createUser/CreateUserFactory";
import { listUsersFactory } from "../modules/listUsers/ListUsersFactory";
import { getUserByIdFactory } from "../modules/getUserById/GetUserByIdFactory";
import { updateUserFactory } from "../modules/updateUser/UpdateUserFactory";
import { deleteUserFactory } from "../modules/deleteUser/DeleteUserFactory";

const routes = Router();

routes.post("/users", (request: Request, response: Response) => {
  createUserFactory().handle(request, response);
});

routes.get("/users", (request: Request, response: Response) => {
  listUsersFactory().handle(request, response);
});

routes.get("/users/:id", (request: Request, response: Response) => {
  getUserByIdFactory().handle(request, response);
});

routes.put("/users/:id", (request: Request, response: Response) => {
  updateUserFactory().handle(request, response);
});

routes.delete("/users/:id", (request: Request, response: Response) => {
  deleteUserFactory().handle(request, response);
});

export { routes };
