import { type ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { type IUserRepository } from "../IUserRepository";
import { v4 as uuid } from "uuid";

class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create(data: ICreateUserDTO): Promise<User> {
        const user = User.create({
            email: data.email,
            password: data.password,
            admin: false,
        });

        Object.assign(user, {
            id: uuid(),
        });

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((item) => item.email === email);

        return user;
    }
}

export { UserRepositoryInMemory };
