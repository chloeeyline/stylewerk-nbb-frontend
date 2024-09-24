import type { Right } from "~/constants/rights";
import {
    isNull,
    isObject,
    isString
} from "~/utils/validation";

class UserError extends Error {
    public name: string = "UserError";

    constructor(
        message: string,
        public readonly code: number,
        public readonly cause?: UserError | Error,
    ) {
        super(message);
    }
}

type UserLoggedIn = {
    state: "loggedIn";
    user: User;
};

type UserIsGuest = {
    state: "guest";
};

type UserAuthenticationError = {
    state: "error";
    error: UserError;
};

/* type Token = {
    token: string;
    expireTime: number;
}; */

type UserLoginApiResponse = GenericApiResponse<{
    accessToken: Token;
    refreshToken: Token;
    statusCode: 1 | 2 | 3 | null;
    consistOverSession: boolean;
    username: string;
    admin: boolean;
    rights: string[];
}>;

type UserInStorage = {
    refreshToken: Token;
    statusCode: 1 | 2 | 3 | null;
    consistOverSession: boolean;
    username: string;
    admin: boolean;
    rights: Set<string>;
    storage: Storage;
};

class User {
    constructor(
        protected _accessToken: Token,
        protected _refreshToken: Token,
        protected _statusCode: 1 | 2 | 3 | null,
        protected _consistOverSession: boolean,
        protected _username: string,
        protected _admin: boolean,
        protected _rights: Set<string>,
        protected _storage: Storage,
    ) {
        this.persistUser();
    }

    public static async setup(): Promise<UserLoggedIn | UserIsGuest | UserAuthenticationError> {
        const userStorage = localStorage.getItem("user.storage");

        if (userStorage === null || (userStorage !== "session" && userStorage !== "local")) {
            return { state: "guest" };
        }

        const userInStorage = this.getUserFromStorage(
            userStorage === "session" ? sessionStorage : localStorage,
        );

        if (typeof userInStorage === "undefined") {
            return { state: "guest" };
        }

        const tokens = await this.getOrRefreshTokens(userInStorage);

        if (tokens instanceof UserError) {
            return { state: "error", error: tokens };
        }

        const { accessToken, refreshToken } = tokens;

        const { statusCode, consistOverSession, username, admin, rights, storage } = userInStorage;

        return {
            state: "loggedIn",
            user: new User(
                accessToken,
                refreshToken,
                statusCode,
                consistOverSession,
                username,
                admin,
                rights,
                storage,
            ),
        };
    }

    public static async login(
        username: string,
        password: string,
        consistOverSession: boolean,
    ): Promise<UserLoggedIn | UserAuthenticationError> {
        try {
            const response = await fetch("/login-dummy.json", {
                body: JSON.stringify({
                    username,
                    password,
                    consistOverSession,
                }),
            });

            if (response.ok !== true) {
                throw new UserError(`Failed logging in! ${response.statusText}`, response.status);
            }

            const json = await response.json();

            if (User.validateLoginResponse(json) === false) {
                throw new UserError("API response is malformed!", 500);
            }

            return {
                state: "loggedIn",
                user: new User(
                    accessToken,
                    refreshToken,
                    statusCode,
                    consistOverSession,
                    username,
                    admin,
                    rights,
                    storage,
                ),
            };
        } catch (error) {
            if (error instanceof UserError) {
                return { state: "error", error };
            }

            return {
                state: "error",
                error: new UserError(
                    "something went wrong",
                    500,
                    error instanceof Error ? error : undefined,
                ),
            };
        }
    }

    private static validateLoginResponse(response: unknown): response is UserLoginApiResponse {
        if (
            isGenericApiResponse(response) === false ||
            !("accessToken" in response.data) ||
            isObject(response.data.accessToken) === false ||
            isNull(response.data.accessToken) ||
            !("token" in response.data.accessToken) ||
            isString(response.data.accessToken.token) === false ||
            !("expireTime" in response.data.accessToken)
        ) {
            return false;
        }

        return true;
    }

    // public static async register(): Promise<UserLoggedIn | UserAuthenticationError> {}

    private static getUserFromStorage(storage: Storage): UserInStorage | undefined {
        const token = storage.getItem("user.refreshToken.token");

        const expireTimeFromStorage = storage.getItem("user.refreshToken.expireTime");

        const expireTime = isNull(expireTimeFromStorage)
            ? expireTimeFromStorage
            : Number(expireTimeFromStorage);

        const statusCodeFromStorage = storage.getItem("user.statusCode");

        const statusCode = isNull(statusCodeFromStorage)
            ? statusCodeFromStorage
            : Number(statusCodeFromStorage);

        const consistOverSession = storage.getItem("user.consistOverSession") === "true";

        const username = storage.getItem("user.username");

        const admin = storage.getItem("user.admin") === "true";

        const rights = new Set((storage.getItem("user.rights") ?? "").split(","));

        if (
            isNull(token) ||
            isNull(expireTime) ||
            (statusCode !== 1 && statusCode !== 2 && statusCode !== 3) ||
            isNull(username)
        ) {
            return;
        }

        const refreshToken = {
            token,
            expireTime,
        };

        return {
            refreshToken,
            statusCode,
            consistOverSession,
            username,
            admin,
            rights,
            storage,
        };
    }

    private static async getOrRefreshTokens(
        user: UserInStorage,
    ): Promise<{ accessToken: Token; refreshToken: Token } | UserError> {
        const token = sessionStorage.getItem("user.accessToken.token");

        const expireTimeFromStorage = sessionStorage.getItem("user.accessToken.expireTime");

        const expireTime = isNull(expireTimeFromStorage)
            ? expireTimeFromStorage
            : Number(expireTimeFromStorage);

        if (isNull(token) || isNull(expireTime)) {
            return await this.fetchTokens(user);
        }

        return {
            accessToken: {
                token,
                expireTime,
            },
            refreshToken: user.refreshToken,
        };
    }

    private static async fetchTokens(
        user: UserInStorage,
    ): Promise<{ accessToken: Token; refreshToken: Token } | UserError> {
        console.log(user);

        return {
            accessToken: {
                token: "",
                expireTime: 0,
            },
            refreshToken: {
                token: "",
                expireTime: 0,
            },
        };
    }

    public static clearUser(): void {
        localStorage.removeItem("user.storage");

        ["user.accessToken.token", "user.accessToken.expireTime"].forEach((key) => {
            sessionStorage.removeItem(key);
        });

        const keys = [
            "user.refreshToken.token",
            "user.refreshToken.expireTime",
            "user.statusCode",
            "user.consistOverSession",
            "user.username",
            "user.admin",
            "user.rights",
        ];

        keys.forEach((key) => {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        });
    }

    public async logout(): Promise<void> {
        User.clearUser();
    }

    public async resetPassword() {}

    public async changeEmail() {}

    // private async validatePassword() {}

    // private async validateUsername() {}

    // private async validateEmail() {}

    public async getUserData() {}

    public async updateUserData() {}

    private persistUser() {
        sessionStorage.setItem("user.accessToken.token", this._accessToken.token);
        sessionStorage.setItem(
            "user.accessToken.expireTime",
            this._accessToken.expireTime.toString(),
        );

        const storage = this._storage;

        const refreshToken = this._refreshToken;
        const statusCode = this._statusCode;
        const consistOverSession = this._consistOverSession;
        const username = this._username;
        const admin = this._admin;
        const rights = this._rights;

        storage.setItem("user.refreshToken.token", refreshToken.token);
        storage.setItem("user.refreshToken.expireTime", refreshToken.expireTime.toString());

        if (isNull(statusCode) === false) {
            storage.setItem("user.statusCode", statusCode.toString());
        } else {
            storage.removeItem("user.statusCode");
        }

        storage.setItem("user.consistOverSession", consistOverSession ? "true" : "false");
        storage.setItem("user.username", username);
        storage.setItem("user.admin", admin ? "true" : "false");
        storage.setItem("user.rights", Array.from(rights).join(","));
    }

    public get accessToken() {
        return this._accessToken;
    }

    public get refreshToken() {
        return this._refreshToken;
    }

    public get statusCode() {
        return this._statusCode;
    }

    public get consistOverSession() {
        return this._consistOverSession;
    }

    public get username() {
        return this._username;
    }

    public get admin() {
        return this._admin;
    }

    public hasRight(...rights: Right[]) {
        return rights.every((right) => this._rights.has(right));
    }
}

export { User };
