import { AppError } from "../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "../createUser/CreateUserService";
import { UpdateUserService } from "./UpdateUserService";

describe("UpdateUserService", () => {
  let usersRepository: IUsersRepository;
  let updateUserService: UpdateUserService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    updateUserService = new UpdateUserService(usersRepository);
    createUserService = new CreateUserService(usersRepository);
  });

  it("should update a user name", async () => {
    const created = await createUserService.execute({
      name: "Alice",
      username: "alice",
      email: "alice@test.com",
    });

    const updated = await updateUserService.execute(created.id as string, { name: "Alice Updated" });

    expect(updated.name).toBe("Alice Updated");
    expect(updated.username).toBe("alice");
  });

  it("should throw 404 when user does not exist", async () => {
    await expect(
      updateUserService.execute("nonexistent-id", { name: "Ghost" })
    ).rejects.toEqual(new AppError("User not found", 404));
  });

  it("should throw 409 when new username is already in use", async () => {
    await createUserService.execute({ name: "Alice", username: "alice", email: "alice@test.com" });
    const bob = await createUserService.execute({ name: "Bob", username: "bob", email: "bob@test.com" });

    await expect(
      updateUserService.execute(bob.id as string, { username: "alice" })
    ).rejects.toEqual(new AppError("Username already in use", 409));
  });

  it("should update only the email", async () => {
    const created = await createUserService.execute({
      name: "Alice",
      username: "alice",
      email: "alice@test.com",
    });

    const updated = await updateUserService.execute(created.id as string, {
      email: "alice@updated.com",
    });

    expect(updated.email).toBe("alice@updated.com");
    expect(updated.name).toBe("Alice");
    expect(updated.username).toBe("alice");
  });
});
