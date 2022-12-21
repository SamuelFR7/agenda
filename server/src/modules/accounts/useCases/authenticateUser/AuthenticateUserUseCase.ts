import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import bcrypt from "bcryptjs";
import { auth } from "@config/auth";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";

interface IResponse {
  user: {
    email: string;
  };
  token: string;
  refresh_token: string;
}

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private readonly usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("User or password incorrect!", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password incorrect!", 401);
    }

    const token = jwt.sign({}, process.env.TOKEN_SECRET, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token,
      }
    );

    const refresh_token_expires_date = dayjs()
      .add(expires_refresh_token_days, "days")
      .toDate();

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: refreshToken,
      user_id: user.id,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
      },
      refresh_token: refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
