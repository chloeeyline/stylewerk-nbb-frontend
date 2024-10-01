import { z } from "zod";

const genericApiSchema = z.object({
    code: z.number().int().safe(),
    codeName: z.string(),
    data: z.unknown(),
});

type GenericApi = z.infer<typeof genericApiSchema>;

export type { GenericApi };
export { genericApiSchema };
