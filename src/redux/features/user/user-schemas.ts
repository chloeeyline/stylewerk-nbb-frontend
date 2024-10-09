import { z } from "zod";
import { tokenSchema } from "~/schemas/token";

const userLoginApiSchema = z.object({
    accessToken: tokenSchema,
    refreshToken: tokenSchema,
    statusCode: z.number().int().finite().safe().nullable(),
    consistOverSession: z.boolean(),
    username: z.string(),
    admin: z.boolean(),
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
