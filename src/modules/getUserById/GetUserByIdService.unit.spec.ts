import { AppError } from "../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "../createUser/CreateUserService";
import { GetUserByIdService } from "./GetUserByIdService";

describe("GetUserByIdService", () => {
  let usersRepository: IUsersRepository;
  let getUserByIdService: GetUserByIdService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    getUserByIdService = new GetUserByIdService(usersRepository);
    createUserService = new CreateUserService(usersRepository);
  });

  it("should return a user by id", async () => {
    const created = await createUserService.execute({
      name: "Alice",
      username: "alice",
      email: "alice@test.com",
    });

    const user = await getUserByIdService.execute(created.id as string);

    expect(user).toHaveProperty("id", created.id);
    expect(user.username).toBe("alice");
  });

  it("should throw 404 when user does not exist", async () => {
    await expect(getUserByIdService.execute("nonexistent-id")).rejects.toEqual(
      new AppError("User not found", 404)
    );
  });
});
