import type { Right } from "~/constants/rights";

type GenericApiResponse<T extends object> = {
    type: number;
    errorCode: null;
    data: T;
};

type UserTokenResponse = {
    token: string;
    expireTime: number;
};

export type UserLoginResponse = GenericApiResponse<{
    accessToken: UserTokenResponse;
    refreshToken: UserTokenResponse;
    consistOverSession: boolean;
    username: string;
    admin: boolean;
    rights: Right[];
}>;
