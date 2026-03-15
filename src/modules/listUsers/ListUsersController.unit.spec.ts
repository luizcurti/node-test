import { Request, Response } from "express";
import { ListUsersController } from "./ListUsersController";
import { ListUsersService } from "./ListUsersService";

describe("ListUsersController - Unit Tests", () => {
  let controller: ListUsersController;
  let mockService: jest.Mocked<ListUsersService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockService = { execute: jest.fn() } as any;
    controller = new ListUsersController(mockService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it("should return 200 with list of users", async () => {
    const users = [
      { id: "1", name: "Alice", username: "alice", email: "alice@test.com" },
      { id: "2", name: "Bob", username: "bob", email: "bob@test.com" },
    ];
    mockService.execute.mockResolvedValue(users as any);

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockService.execute).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(users);
  });

  it("should return 200 with empty array when no users exist", async () => {
    mockService.execute.mockResolvedValue([]);

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  it("should return 500 on unknown error", async () => {
    mockService.execute.mockRejectedValue(new Error("DB connection lost"));

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "DB connection lost" });
  });
});
