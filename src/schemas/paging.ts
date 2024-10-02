import { z } from "zod";

const pagingSchema = z.object({
    count: z.number().int().safe().nonnegative(),
    page: z.number().int().safe().nonnegative(),
    maxPage: z.number().int().safe().nonnegative(),
    perPage: z.number().int().safe().nonnegative(),
});

export { pagingSchema };
export type Paging = z.infer<typeof pagingSchema>;
