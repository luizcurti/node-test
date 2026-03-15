import { Request, Response } from "express";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserService } from "./DeleteUserService";
import { AppError } from "../../errors/AppError";

describe("DeleteUserController - Unit Tests", () => {
  let controller: DeleteUserController;
  let mockService: jest.Mocked<DeleteUserService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockService = { execute: jest.fn() } as any;
    controller = new DeleteUserController(mockService);
    mockRequest = { params: { id: "some-id" } };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it("should return 204 on successful delete", async () => {
    mockService.execute.mockResolvedValue(undefined);

    await controller.handle(mockRequest as Request, mockResponse as Response);

    expect(mockService.execute).toHaveBeenCalledWith("some-id");
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should return 404 when user not found", async () => {
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
