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

const userDataSchema = z.object({
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.enum(["NotSpecified", "Female", "Male", "NonBinary"]),
    birthday: z.number().int().safe().nonnegative(),
});

type UserLoginApi = z.infer<typeof userLoginApiSchema>;
type UserData = z.infer<typeof userDataSchema>;

export { userLoginApiSchema, userDataSchema };
export type { UserLoginApi, UserData };
