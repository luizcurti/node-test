import { prisma } from "../../database/client";
import { IUserUpdateProps, User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepositories";

class PrismaUsersRepository implements IUsersRepository {
  async exists(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { username } });
    return !!user;
  }

  async create({ username, email, name }: User): Promise<User> {
    const user = await prisma.user.create({ data: { username, email, name } });
    return user;
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, data: IUserUpdateProps): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

export { PrismaUsersRepository };
