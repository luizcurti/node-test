import { IUserUpdateProps, User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string, data: IUserUpdateProps): Promise<User> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    if (data.username && data.username !== userExists.username) {
      const usernameInUse = await this.usersRepository.exists(data.username);
      if (usernameInUse) {
        throw new AppError("Username already in use", 409);
      }
    }

    return this.usersRepository.update(id, data);
  }
}

export { UpdateUserService };
