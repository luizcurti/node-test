import { AppError } from "../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "../createUser/CreateUserService";
import { DeleteUserService } from "./DeleteUserService";
import { ListUsersService } from "../listUsers/ListUsersService";

describe("DeleteUserService", () => {
  let usersRepository: IUsersRepository;
  let deleteUserService: DeleteUserService;
  let createUserService: CreateUserService;
  let listUsersService: ListUsersService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    deleteUserService = new DeleteUserService(usersRepository);
    createUserService = new CreateUserService(usersRepository);
    listUsersService = new ListUsersService(usersRepository);
  });

  it("should delete a user", async () => {
    const created = await createUserService.execute({
      name: "Alice",
      username: "alice",
      email: "alice@test.com",
    });

    await deleteUserService.execute(created.id as string);

    const users = await listUsersService.execute();
    expect(users).toHaveLength(0);
  });

  it("should throw 404 when user does not exist", async () => {
    await expect(deleteUserService.execute("nonexistent-id")).rejects.toEqual(
      new AppError("User not found", 404)
    );
  });
});
