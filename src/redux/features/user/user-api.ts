import { Auth } from "#/backend-routes";
import type { Token } from "~/schemas/token";
import { tokenSchema } from "~/schemas/token";
import Ajax from "~/utils/ajax";
import type { UserLoginApi } from "./user-schemas";
import { userDataSchema, userLoginApiSchema } from "./user-schemas";

export type UserNeedsRefresh = {
    status: "refresh";
    dataStatus: "empty";
};

export type UserIsLoggedIn = {
    status: "loggedIn";
    dataStatus: "empty" | "loading" | "loaded";
    username: string;
    admin: boolean;
};

export type UserIsGuest = {
    status: "guest";
    dataStatus: "empty";
};

export type UserIsFailed = {
    status: "failed";
    dataStatus: "empty";
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
        return { status: "guest", dataStatus: "empty" };
    }

    const { token } = refreshToken;

    const response = await Ajax.post(Auth.RefreshToken, {
        body: {
            token,
            consistOverSession: true,
        },
    });

    if (response.ok === false) {
        console.error(response.error);
        clear();

        return { status: "guest", dataStatus: "empty" };
    }

    const result = userLoginApiSchema.safeParse(response.result);

    if (result.success === false) {
        const formatted = result.error.format();

        const code = 100;

        const text = formatted._errors.join("\n");

        console.error(code, text);
        clear();

        return { status: "guest", dataStatus: "empty" };
    }

    persistUser(result.data);

    const { username, admin } = result.data;

    return {
        status: "loggedIn",
        dataStatus: "empty",
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
            dataStatus: "empty",
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
            dataStatus: "empty",
            error: {
                code,
                text,
            },
        };
    }

    persistUser(result.data);

    return {
        status: "loggedIn",
        dataStatus: "empty",
        username: result.data.username,
        admin: result.data.admin,
    };
};

export const logout = async (): Promise<UserIsGuest> => {
    const result = await Ajax.post(Auth.Logout, { auth: true });

    if (result.ok === false) {
        console.error("Error logging out! Simply discarding local tokens!", result.error);
    }

    clear();

    return { status: "guest", dataStatus: "empty" };
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
            dataStatus: "empty",
            username: user.username,
            admin: user.admin,
        };
    }

    const refreshToken = getRefreshToken();

    if (refreshToken === null) {
        return { status: "guest", dataStatus: "empty" };
    }

    return { status: "refresh", dataStatus: "empty" };
};

export const fetchUserData = async () => {
    const token = await getAccessToken();

    if (token === null) {
        return false;
    }

    const response = await Ajax.get(Auth.GetUserData, { auth: true });

    if (response.ok === false) {
        return false;
    }

    const user = await userDataSchema.safeParseAsync(response.result);

    if (user.success === false) {
        return false;
    }

    return user.data;
};

export const updateEmail = (email: string) =>
    Ajax.post(Auth.UpdateEmail, {
        auth: true,
        search: { email },
    });

export const verifyUpdateEmail = (code: string) =>
    Ajax.post(Auth.VerifyUpdatedEmail, {
        auth: true,
        search: { code },
    });

export const updateUserData = (body: {
    password?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
}) =>
    Ajax.post(Auth.UpdateUserData, {
        auth: true,
        body,
    });

export const requestPasswordReset = (email: string) =>
    Ajax.post(Auth.RequestPasswordReset, { body: { toValidate: email } });

export const resetPassword = (token: string, password: string) =>
    Ajax.post(Auth.ResetPassword, {
        body: {
            token,
            password,
        },
    });

export const removeSessions = () => Ajax.post(Auth.RemoveSessions, { auth: true });
