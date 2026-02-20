import { AppError } from "../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserService };
