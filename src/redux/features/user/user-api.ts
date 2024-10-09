import { Auth } from "~/constants/backend-routes";
import { Token, tokenSchema } from "~/schemas/token";
import Ajax from "~/utils/ajax";
import { UserLoginApi, userLoginApiSchema } from "./user-schemas";

export type UserNeedsRefresh = {
    status: "refresh";
};

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

const getUserFromStorage = () => {
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
};

const getRefreshToken = () => {
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

        if (Date.now() > result.data.expireTime) {
            console.error("RefreshToken expired!");

            clear();

            return null;
        }

        return result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const clear = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
};

const persistUser = ({
    accessToken,
    admin,
    consistOverSession,
    refreshToken,
    statusCode,
    username,
}: UserLoginApi) => {
    sessionStorage.setItem(
        "user",
        JSON.stringify({
            accessToken,
            refreshToken,
            statusCode,
            consistOverSession,
            username,
            admin,
        }),
    );

    if (consistOverSession === true) {
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    } else {
        localStorage.removeItem("refreshToken");
    }
};

export const getAccessToken = async (refresh: boolean = true): Promise<Token["token"] | null> => {
    const user = getUserFromStorage();

    if (user === null) {
        return null;
    }

    const { accessToken } = user;

    if (Date.now() < accessToken.expireTime) {
        return accessToken.token;
    }

    if (refresh) {
        const { refreshToken } = user;

        if (Date.now() > refreshToken.expireTime) {
            return null;
        }

        await autoLogin();

        return await getAccessToken(false);
    }

    return null;
};

export const autoLogin = async (): Promise<UserIsLoggedIn | UserIsGuest> => {
    const refreshToken = getRefreshToken();

    if (refreshToken === null) {
        return { status: "guest" };
    }

    const { token } = refreshToken;

    const response = await Ajax.post(Auth.RefreshToken, {
        body: {
            token,
            consistOverSession: true,
        },
    });

    console.log(response);

    if (response.ok === false) {
        console.error(response.error);
        clear();

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
        clear();

        return {
            status: "guest",
        };
    }

    persistUser(result.data);

    const { username, admin } = result.data;

    return {
        status: "loggedIn",
        username,
        admin,
    };
};

export const login = async (body: {
    username: string;
    password: string;
    consistOverSession: boolean;
}): Promise<UserIsLoggedIn | UserIsFailed> => {
    const response = await Ajax.post(Auth.Login, {
        body,
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

    persistUser(result.data);

    return {
        status: "loggedIn",
        username: result.data.username,
        admin: result.data.admin,
    };
};

export const logout = async (): Promise<UserIsGuest> => {
    const result = await Ajax.post(Auth.Logout, { auth: true });

    if (result.ok === false) {
        console.error("Error logging out!", result.error);
        console.log("Simply discarding local tokens!");
    }

    clear();

    return { status: "guest" };
};

const validate = (route: string, toValidate: string) =>
    Ajax.post(route, {
        body: {
            toValidate,
        },
    });

export const validatePassword = validate.bind(null, Auth.ValidatePassword);
export const validateEmail = validate.bind(null, Auth.ValidateEmail);
export const validateUsername = validate.bind(null, Auth.ValidateUsername);

export const verifyEmail = (token: string) =>
    Ajax.post(Auth.VerifyEmail, {
        search: {
            token,
        },
    });

export const register = async (body: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: number;
}): Promise<{ ok: true } | { ok: false; error: string }> => {
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
};

export const setup = (): UserNeedsRefresh | UserIsGuest | UserIsLoggedIn => {
    const user = getUserFromStorage();

    if (user !== null) {
        return {
            status: "loggedIn",
            username: user.username,
            admin: user.admin,
        };
    }

    const refreshToken = getRefreshToken();

    if (refreshToken === null) {
        return { status: "guest" };
    }

    return { status: "refresh" };
};
