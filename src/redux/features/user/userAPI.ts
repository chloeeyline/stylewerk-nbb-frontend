import type { User, UserRight } from "./userTypes";
import { Right } from "#/rights";
import wait from "~/utils/wait";

export const defaultUserRight: UserRight = {
    admin: false,
    entries: Right.Restricted,
    templates: Right.Restricted,
};

// A mock function to mimic making an async request for data
export const fetchUser = async (id: string): Promise<User> => {
    await wait(500);

    return {
        id,
        token: "foobar-token",
        refreshToken: "foobar-refreshToken",
        username: "foobar-username",
        right: defaultUserRight,
    };
};
