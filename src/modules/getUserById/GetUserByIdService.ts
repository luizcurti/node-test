import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export { GetUserByIdService };
