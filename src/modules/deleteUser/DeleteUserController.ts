import { Request, Response } from "express";
import { DeleteUserService } from "./DeleteUserService";
import { AppError } from "../../errors/AppError";

class DeleteUserController {
  constructor(private deleteUser: DeleteUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await this.deleteUser.execute(id);
      return response.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }
      return response.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export { DeleteUserController };
