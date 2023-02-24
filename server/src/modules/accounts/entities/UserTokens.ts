class UserTokens {
    id?: string;
    refresh_token: string;
    user_id: string;
    expires_date: Date;
    created_at: Date;

    private constructor(userToken: UserTokens) {
        return Object.assign(this, {
            expires_date: userToken.expires_date,
            refresh_token: userToken.refresh_token,
            user_id: userToken.user_id,
        });
    }

    static create(userTokenInfo: UserTokens) {
        const userToken = new UserTokens(userTokenInfo);

        return userToken;
    }
}

export { UserTokens };
