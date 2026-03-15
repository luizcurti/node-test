import { IUserProps } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "./CreateUserService";

describe("Create user", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const userData: IUserProps = {
      name: "Test Name",
      email: "test@test.com",
      username: "testusername",
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.username).toBe("testusername");
  });

  it("should not be able to create an existing user (duplicate username)", async () => {
    const userData: IUserProps = {
      name: "Test Existing Name",
      email: "testexisting@test.com",
      username: "testexisting",
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new AppError("User already exists!", 409)
    );
  });

  it("should not be able to create user with duplicate email", async () => {
    await createUserService.execute({
      name: "First User",
      email: "shared@email.com",
      username: "firstuser",
    });

    await expect(
      createUserService.execute({
        name: "Second User",
        email: "shared@email.com",
        username: "seconduser",
      })
    ).rejects.toEqual(new AppError("User already exists!", 409));
  });
});
