import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { config } from "dotenv";
import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepository";
let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe("Authenticate user use case", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    config();
  });

  it("should be able to authenticate a new user", async () => {
    const newUser: ICreateUserDTO = {
      email: "SAMUEL",
      password: "123",
    };

    await createUserUseCase.execute(newUser);

    const authenticatedUser = await authenticateUserUseCase.execute(newUser);

    expect(authenticatedUser).toBeTruthy();
  });

  it("should not be able to authenticate a user with nonexistent email", async () => {
    await createUserUseCase.execute({
      email: "SAMUEL",
      password: "123",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "EDUARDO",
        password: "123",
      })
    ).rejects.toEqual(new AppError("User or password incorrect!", 401));
  });

  it("should not be able to authenticate a user with wrong password", async () => {
    await createUserUseCase.execute({
      email: "SAMUEL",
      password: "123",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "SAMUEL",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("User or password incorrect!", 401));
  });
});
