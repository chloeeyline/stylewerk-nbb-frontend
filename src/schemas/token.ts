import { z } from "zod";

const tokenSchema = z.object({
    token: z.string(),
    expireTime: z.number().finite().safe().int(),
});

type Token = z.infer<typeof tokenSchema>;

export type { Token };
export { tokenSchema };
