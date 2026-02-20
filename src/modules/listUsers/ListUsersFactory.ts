import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { ListUsersController } from "./ListUsersController";
import { ListUsersService } from "./ListUsersService";

export const listUsersFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const listUsersService = new ListUsersService(usersRepository);
  return new ListUsersController(listUsersService);
};
