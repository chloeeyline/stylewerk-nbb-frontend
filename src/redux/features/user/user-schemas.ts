import { z } from "zod";
import { tokenSchema } from "~/schemas/token";

const statusCodeSchema = z.number().int().finite().safe().nullable();

const rightsSchema = z.custom<Set<string>>().transform<Set<string>>((values) => {
    if (Array.isArray(values) && values.every((value) => typeof value === "string")) {
        return new Set<string>(values);
    }

    return new Set<string>();
});

const userLoginApiSchema = z.object({
    accessToken: tokenSchema,
    refreshToken: tokenSchema,
    statusCode: statusCodeSchema,
    consistOverSession: z.boolean(),
    username: z.string(),
    admin: z.boolean(),
    rights: rightsSchema,
});

type UserLoginApi = z.infer<typeof userLoginApiSchema>;

const userInStorageSchema = z.object({
    refreshToken: tokenSchema,
    statusCode: statusCodeSchema,
    consistOverSession: z.boolean(),
    username: z.string(),
    admin: z.boolean(),
    rights: rightsSchema,
});

type UserInStorage = z.infer<typeof userInStorageSchema>;

export { userInStorageSchema, userLoginApiSchema };
export type { UserInStorage, UserLoginApi };
