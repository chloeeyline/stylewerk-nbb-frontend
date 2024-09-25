import { z } from "zod";

const makeApiSchema = <T>(schema: z.ZodType<T>) => {
    return z.object({
        type: z.number().int().safe(),
        typeText: z.string(),
        errorCode: z.number().int().safe().nullable(),
        errorText: z.string().nullable(),
        data: schema,
    });
};

const genericApiSchema = makeApiSchema(z.unknown());

type GenericApi = z.infer<typeof genericApiSchema>;

export type { GenericApi };
export { makeApiSchema, genericApiSchema };
