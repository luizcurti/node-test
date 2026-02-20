import { IUserUpdateProps, User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepositories";
import { v4 as uuid } from "uuid";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    Object.assign(user, { id: uuid() });
    this.users.push(user);
    return user;
  }

  async exists(username: string): Promise<boolean> {
    return this.users.some((u) => u.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async update(id: string, data: IUserUpdateProps): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    Object.assign(this.users[index], data);
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }
}

export { UsersRepositoryInMemory };
