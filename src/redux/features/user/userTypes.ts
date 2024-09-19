import { Right } from "#/rights";

export interface UserRight {
    admin: boolean;
    entries: Right;
    templates: Right;
}

export interface User {
    id: string;
    token: string;
    refreshToken: string;
    username: string;
    right: UserRight;
}
