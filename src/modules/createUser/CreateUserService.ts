import { IUserProps, User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, username, name }: IUserProps): Promise<User> {
    const userAlreadyExists = await this.usersRepository.exists(username);

    if (userAlreadyExists) {
      throw new AppError("User already exists!", 409);
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("User already exists!", 409);
    }

    const userCreate = User.create({ email, username, name });
    const user = await this.usersRepository.create(userCreate);
    return user;
  }
}

export { CreateUserService };
