import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { v4 as uuid } from "uuid";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = UserTokens.create({
      expires_date,
      user_id,
      refresh_token,
      created_at: new Date(Date.now()),
    });

    Object.assign(userTokens, {
      id: uuid(),
    });

    this.usersTokens.push(userTokens);

    return userTokens;
  }

  async findByUsersIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (item) => item.user_id === user_id && item.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const tokenToDelete = this.usersTokens.find((item) => item.id === id);

    const index = this.usersTokens.indexOf(tokenToDelete);
    if (index > -1) {
      this.usersTokens.splice(index, -1);
    }
  }
}

export { UsersTokensRepositoryInMemory };
