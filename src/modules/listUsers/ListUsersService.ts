import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class ListUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}

export { ListUsersService };
