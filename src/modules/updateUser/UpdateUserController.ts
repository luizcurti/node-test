import Joi from "joi";
import { Request, Response } from "express";
import { UpdateUserService } from "./UpdateUserService";
import { AppError } from "../../errors/AppError";

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  username: Joi.string().min(3).max(50).alphanum(),
  email: Joi.string().email(),
}).min(1);

class UpdateUserController {
  constructor(private updateUser: UpdateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const { error: validationError, value } = updateUserSchema.validate(request.body, {
        abortEarly: false,
      });

      if (validationError) {
        return response.status(422).json({
          error: "Validation error",
          details: validationError.details.map((d) => d.message),
        });
      }

      const user = await this.updateUser.execute(id, value);
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

export { UpdateUserController };
