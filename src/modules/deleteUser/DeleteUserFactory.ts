import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserService } from "./DeleteUserService";

export const deleteUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const deleteUserService = new DeleteUserService(usersRepository);
  return new DeleteUserController(deleteUserService);
};
