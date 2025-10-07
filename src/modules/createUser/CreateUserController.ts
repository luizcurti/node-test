import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, username, name } = request.body;
      const user = await this.createUser.execute({ email, username, name });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  }
}

export { CreateUserController };
