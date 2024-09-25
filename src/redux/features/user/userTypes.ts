import type { RightsMap } from "#/rights";

export interface UserRight {
    admin: boolean;
    entries: RightsMap;
    templates: RightsMap;
}

export interface User {
    id: string;
    token: string;
    refreshToken: string;
    username: string;
    admin: boolean;
    right: UserRight;
}
