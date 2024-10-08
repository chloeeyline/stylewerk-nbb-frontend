import { Auth } from "#/backend-routes";
import { tokenSchema, type Token } from "~/schemas/token";
import Ajax from "~/utils/ajax";
import type { UserLoginApi } from "./user-schemas";
import { userLoginApiSchema } from "./user-schemas";

export type UserIsLoggedIn = {
    status: "loggedIn";
    username: string;
    admin: boolean;
};

export type UserIsGuest = {
    status: "guest";
};

export type UserIsFailed = {
    status: "failed";
    error: {
        code: number;
        text: string;
    };
};

type UserInClassLoggedIn = UserIsLoggedIn & UserLoginApi;

class User {
    protected _state: UserIsGuest | UserInClassLoggedIn | UserIsFailed = { status: "guest" };

    constructor(
        state: UserIsGuest | UserInClassLoggedIn = {
            status: "guest",
        },
    ) {
        this._state = state;

        if (state.status === "loggedIn") {
            this.persistUser();
        }
    }

    public static async setup(): Promise<User> {
        const user = this.getUserFromStorage();

        if (user !== null) {
            return new User({
                status: "loggedIn",
                ...user,
            });
        }

        const refreshToken = this.getRefreshToken();

        if (refreshToken === null) {
            return new User();
        }

        if (Date.now() > refreshToken.expireTime) {
            console.error("RefreshToken expired!");
            this.clear();
            return new User();
        }

        return new User(await this.autoLoginUser(refreshToken.token));
    }

    protected static clear() {
        sessionStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
    }

    protected static async autoLoginUser(
        token: string,
    ): Promise<UserInClassLoggedIn | UserIsGuest> {
        const response = await Ajax.post(Auth.RefreshToken, {
            body: {
                token,
                consistOverSession: true,
            },
        });

        if (response.ok === false) {
            console.error(response.error);
            this.clear();

            return {
                status: "guest",
            };
        }

        const result = userLoginApiSchema.safeParse(response.result);

        if (result.success === false) {
            const formatted = result.error.format();

            const code = 100;

            const text = formatted._errors.join("\n");

            console.error(code, text);
            this.clear();

            return {
                status: "guest",
            };
        }

        const { data } = result;

        return {
            status: "loggedIn",
            ...data,
        };
    }

    protected static getRefreshToken(): Token | null {
        try {
            const token = localStorage.getItem("refreshToken");

            if (token === null) {
                return null;
            }

            const result = tokenSchema.safeParse(JSON.parse(token));

            if (result.success === false) {
                console.error(result.error);
                return null;
            }

            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    protected static getUserFromStorage(): UserLoginApi | null {
        try {
            const user = sessionStorage.getItem("user");

            if (user === null) {
                return null;
            }

            const result = userLoginApiSchema.safeParse(JSON.parse(user));

            if (result.success === false) {
                console.error(result.error);
                return null;
            }

            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async login(
        username: string,
        password: string,
        consistOverSession: boolean,
    ): Promise<UserIsLoggedIn | UserIsFailed> {
        const response = await Ajax.post(Auth.Login, {
            body: {
                username,
                password,
                consistOverSession,
            },
            auth: false,
        });

        if (response.ok === false) {
            const { code, message } = response.error;

            return {
                status: "failed",
                error: {
                    code,
                    text: message,
                },
            };
        }

        const result = userLoginApiSchema.safeParse(response.result);

        if (result.success === false) {
            const formatted = result.error.format();

            const code = 100;

            const text = formatted._errors.join("\n");

            return {
                status: "failed",
                error: {
                    code,
                    text,
                },
            };
        }

        this._state = {
            status: "loggedIn",
            ...result.data,
        };

        this.persistUser();

        return {
            status: this._state.status,
            username: this._state.username,
            admin: this._state.admin,
        };
    }

    public static async registration(body: {
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        gender: string;
        birthday: number;
    }): Promise<{ ok: true } | { ok: false; error: string }> {
        const result = await Ajax.post(Auth.Registration, {
            body,
        });

        if (result.ok === false) {
            return {
                ok: false,
                error: result.error.message,
            };
        }

        return { ok: true };
    }

    public async logout(): Promise<UserIsGuest> {
        const result = await Ajax.post(Auth.Login, { auth: true });

        if (result.ok === false) {
            console.error("Error logging out!", result.error);
            console.log("Simply discarding local tokens!");
        }

        this._state = { status: "guest" };
        User.clear();

        return this._state;
    }

    public async resetPassword() {}

    public async changeEmail() {}

    public static async validatePassword(toValidate: string) {
        return await Ajax.post(Auth.ValidatePassword, {
            body: {
                toValidate,
            },
        });
    }

    public static async validateEmail(toValidate: string) {
        return await Ajax.post(Auth.ValidateEmail, {
            body: {
                toValidate,
            },
        });
    }

    public static async validateUsername(toValidate: string) {
        return await Ajax.post(Auth.ValidateUsername, {
            body: {
                toValidate,
            },
        });
    }

    public static async verifyEmail(token: string) {
        return await Ajax.post(Auth.VerifyEmail, {
            search: {
                token,
            },
        });
    }

    // public async getUserData() {}

    // public async updateUserData() {}

    protected persistUser() {
        if (this._state.status !== "loggedIn") {
            return;
        }

        const {
            accessToken,
            refreshToken,
            statusCode,
            consistOverSession,
            username,
            admin,
            rights,
        } = this._state;

        sessionStorage.setItem(
            "user",
            JSON.stringify({
                accessToken,
                refreshToken,
                statusCode,
                consistOverSession,
                username,
                admin,
                rights: Array.from(rights),
            }),
        );

        if (consistOverSession === true) {
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        } else {
            localStorage.removeItem("refreshToken");
        }
    }

    protected async refreshToken(token: Token, consistOverSession: boolean) {
        const response = await Ajax.post(Auth.RefreshToken, {
            body: {
                token,
                consistOverSession,
            },
        });

        if (response.ok === false) {
            console.error(response.error);
            await this.logout();
            return;
        }

        const result = userLoginApiSchema.safeParse(response.result);

        if (result.success === false) {
            const formatted = result.error.format();

            const code = 100;

            const text = formatted._errors.join("\n");

            console.error(code, text);
            await this.logout();
            return;
        }

        const { data } = result;

        this._state = {
            status: "loggedIn",
            ...data,
        };
    }

    public async getToken() {
        if (this._state.status !== "loggedIn") {
            return "";
        }

        const { accessToken, refreshToken, consistOverSession } = this._state;

        if (accessToken.expireTime < Date.now()) {
            await this.refreshToken(refreshToken, consistOverSession);
        }

        if (this._state.status !== "loggedIn") {
            return "";
        }

        return this._state.accessToken.token;
    }

    public get state(): UserIsGuest | UserIsLoggedIn | UserIsFailed {
        switch (this._state.status) {
            case "guest": {
                const { status } = this._state;

                return {
                    status,
                };
            }
            case "loggedIn": {
                const { status, username, admin } = this._state;

                return {
                    status,
                    username,
                    admin,
                };
            }
            case "failed": {
                const { status, error } = this._state;

                return {
                    status,
                    error,
                };
            }
        }
    }

    public get loggedIn() {
        return this._state.status === "loggedIn";
    }
}

const userPromise = User.setup();

export { User, userPromise };
