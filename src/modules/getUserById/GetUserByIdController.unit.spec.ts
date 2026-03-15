import { Request, Response } from "express";
import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdService } from "./GetUserByIdService";
import { AppError } from "../../errors/AppError";

describe("GetUserByIdController - Unit Tests", () => {
  let controller: GetUserByIdController;
  let mockService: jest.Mocked<GetUserByIdService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockService = { execute: jest.fn() } as any;
    controller = new GetUserByIdController(mockService);
    mockRequest = { params: { id: "some-id" } };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it("should return 200 with the found user", async () => {
    const user = { id: "some-id", name: "Alice", username: "alice", email: "alice@test.com" };
    mockService.execute.mockResolvedValue(user as any);

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockService.execute).toHaveBeenCalledWith("some-id");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  it("should return 404 when service throws AppError (user not found)", async () => {
    mockService.execute.mockRejectedValue(new AppError("User not found", 404));

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 500 on unknown error", async () => {
    mockService.execute.mockRejectedValue(new Error("DB error"));

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
