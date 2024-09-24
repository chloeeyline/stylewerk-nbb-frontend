import type { RightsSet } from "#/rights";

/* export interface UserRight {
    admin: boolean;
    entries: Right;
    templates: Right;
} */

// export type UserRightNamespaces = "entries" | "templates";

// export type UserRights = { admin: boolean } & Record<UserRightNamespaces, RightsMap>;

export interface User {
    id: string;
    token: string;
    refreshToken: string;
    username: string;
    admin: boolean;
    rights: RightsSet;
}
