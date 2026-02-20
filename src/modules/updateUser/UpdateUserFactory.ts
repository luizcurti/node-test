import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserService } from "./UpdateUserService";

export const updateUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const updateUserService = new UpdateUserService(usersRepository);
  return new UpdateUserController(updateUserService);
};
