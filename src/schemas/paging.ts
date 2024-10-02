import { z } from "zod";

const pagingSchema = z.object({
    count: z.number().int().safe().positive(),
    page: z.number().int().safe().positive(),
    maxPage: z.number().int().safe().positive(),
    perPage: z.number().int().safe().positive(),
});

export { pagingSchema };
export type Paging = z.infer<typeof pagingSchema>;
