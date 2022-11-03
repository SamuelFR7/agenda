import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly usersRepository: IUserRepository
  ) {}

  async execute({ email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 401);
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
