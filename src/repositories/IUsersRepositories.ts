import { IUserUpdateProps, User } from "../entities/User";

interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(username: string): Promise<boolean>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: IUserUpdateProps): Promise<User>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
