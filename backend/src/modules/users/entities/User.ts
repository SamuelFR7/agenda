class User {
    id?: string
    email: string
    password: string
    admin: boolean

    private constructor(user: User) {
        return Object.assign(this, {
            email: user.email,
            password: user.password,
            admin: user.admin,
        })
    }

    static create(userInfo: User) {
        const user = new User(userInfo)

        return user
    }
}

export { User }
