import { Request, Response } from "express";
import { GetUserByIdService } from "./GetUserByIdService";
import { AppError } from "../../errors/AppError";

class GetUserByIdController {
  constructor(private getUserById: GetUserByIdService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const user = await this.getUserById.execute(id);
      return response.status(200).json(user);
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

export { GetUserByIdController };
