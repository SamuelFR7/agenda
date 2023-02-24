import { type ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { type User } from "../entities/User";

interface IUserRepository {
    create: (data: ICreateUserDTO) => Promise<User>;
    findByEmail: (email: string) => Promise<User>;
}

export type { IUserRepository };
