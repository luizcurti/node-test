import { Request, Response } from "express";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserService } from "./UpdateUserService";
import { AppError } from "../../errors/AppError";

describe("UpdateUserController - Unit Tests", () => {
  let controller: UpdateUserController;
  let mockService: jest.Mocked<UpdateUserService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockService = { execute: jest.fn() } as any;
    controller = new UpdateUserController(mockService);
    mockRequest = { params: { id: "some-id" }, body: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it("should return 200 with updated user", async () => {
    const updatedUser = { id: "some-id", name: "New Name", username: "user", email: "user@test.com" };
    mockRequest.body = { name: "New Name" };
    mockService.execute.mockResolvedValue(updatedUser as any);

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockService.execute).toHaveBeenCalledWith("some-id", { name: "New Name" });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
  });

  it("should return 422 when body is empty", async () => {
    mockRequest.body = {};

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(422);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validation error" })
    );
    expect(mockService.execute).not.toHaveBeenCalled();
  });

  it("should return 422 when email format is invalid", async () => {
    mockRequest.body = { email: "not-a-valid-email" };

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(422);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validation error" })
    );
    expect(mockService.execute).not.toHaveBeenCalled();
  });

  it("should return 404 when user not found", async () => {
    mockRequest.body = { name: "Ghost" };
    mockService.execute.mockRejectedValue(new AppError("User not found", 404));

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 409 when username is already in use", async () => {
    mockRequest.body = { username: "takenuser" };
    mockService.execute.mockRejectedValue(new AppError("Username already in use", 409));

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Username already in use" });
  });

  it("should return 500 on unknown error", async () => {
    mockRequest.body = { name: "Test" };
    mockService.execute.mockRejectedValue(new Error("DB connection lost"));

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
