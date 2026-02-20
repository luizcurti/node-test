import { Request, Response } from "express";
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService";

describe("CreateUserController - Unit Tests", () => {
  let createUserController: CreateUserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockCreateUserService: jest.Mocked<CreateUserService>;

  beforeEach(() => {
    // Create mock service
    mockCreateUserService = {
      execute: jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    
    createUserController = new CreateUserController(mockCreateUserService);
    
    mockRequest = {
      body: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Reset all mocks
    jest.clearAllMocks();
  });

  it("should create a user successfully", async () => {
    // Arrange
    const userData = {
      name: "Test Name",
      email: "test@test.com",
      username: "testusername"
    };
    
    const expectedUser = {
      id: "123",
      ...userData
    };

    mockRequest.body = userData;
    mockCreateUserService.execute.mockResolvedValue(expectedUser);

    // Act
    await createUserController.handle(mockRequest as Request, mockResponse as Response);

    // Assert
    expect(mockCreateUserService.execute).toHaveBeenCalledWith(userData);
    expect(mockCreateUserService.execute).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedUser);
  });

  it("should return 409 when service throws an AppError (e.g. user already exists)", async () => {
    // Arrange
    const userData = {
      name: "Test Name",
      email: "test@test.com",
      username: "testusername"
    };
    
    const errorMessage = "User already exists!";
    mockRequest.body = userData;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { AppError } = require("../../errors/AppError");
    mockCreateUserService.execute.mockRejectedValue(new AppError(errorMessage, 409));

    // Act
    await createUserController.handle(mockRequest as Request, mockResponse as Response);

    // Assert
    expect(mockCreateUserService.execute).toHaveBeenCalledWith(userData);
    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should handle unknown errors", async () => {
    // Arrange
    const userData = {
      name: "Test Name", 
      email: "test@test.com",
      username: "testusername"
    };
    
    mockRequest.body = userData;
    mockCreateUserService.execute.mockRejectedValue("Unknown error");

    // Act
    await createUserController.handle(mockRequest as Request, mockResponse as Response);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Unknown error" });
  });
});