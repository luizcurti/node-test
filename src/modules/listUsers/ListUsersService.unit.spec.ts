import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "../createUser/CreateUserService";
import { ListUsersService } from "./ListUsersService";

describe("ListUsersService", () => {
  let usersRepository: IUsersRepository;
  let listUsersService: ListUsersService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    listUsersService = new ListUsersService(usersRepository);
    createUserService = new CreateUserService(usersRepository);
  });

  it("should return an empty array when no users exist", async () => {
    const users = await listUsersService.execute();
    expect(users).toEqual([]);
  });

  it("should return all created users", async () => {
    await createUserService.execute({ name: "Alice", username: "alice", email: "alice@test.com" });
    await createUserService.execute({ name: "Bob", username: "bob", email: "bob@test.com" });

    const users = await listUsersService.execute();

    expect(users).toHaveLength(2);
    expect(users[0].username).toBe("alice");
    expect(users[1].username).toBe("bob");
  });
});
