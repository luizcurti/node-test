import { Request, Response } from "express";
import { ListUsersService } from "./ListUsersService";

class ListUsersController {
  constructor(private listUsers: ListUsersService) {}

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.listUsers.execute();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export { ListUsersController };
