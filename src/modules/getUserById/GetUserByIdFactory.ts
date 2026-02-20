import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdService } from "./GetUserByIdService";

export const getUserByIdFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const getUserByIdService = new GetUserByIdService(usersRepository);
  return new GetUserByIdController(getUserByIdService);
};
