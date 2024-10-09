import { z } from "zod";

type NbbError = {
    name: "NbbError";
    code: number;
    message: string;
    isHttp: boolean;
    cause?: NbbError;
};

const nbbErrorSchema: z.ZodType<NbbError> = z.object({
    name: z.literal("NbbError"),
    code: z.number().int().safe().nonnegative(),
    message: z.string(),
    isHttp: z.boolean(),
    cause: z.lazy(() => nbbErrorSchema.optional()),
});

const createNbbError = (
    code: number,
    message: string,
    isHttp: boolean,
    cause?: NbbError,
): NbbError => ({
    name: "NbbError",
    code,
    message,
    isHttp,
    cause,
});

export { createNbbError, nbbErrorSchema };
export type { NbbError };
