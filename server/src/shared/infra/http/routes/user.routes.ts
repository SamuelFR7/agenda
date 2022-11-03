import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/refresh-token", refreshTokenController.handle);

export { userRoutes };
