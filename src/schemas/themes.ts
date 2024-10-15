import { z } from "zod";

const themeApiSchema = z.object({
    id: z.string(),
    name: z.string(),
    base: z.union([z.literal("light"), z.literal("dark"), z.literal("system")]),
    data: z.string(),
});

type ThemeApi = z.infer<typeof themeApiSchema>;

const themeEditableSchema = z.record(z.string(), z.string()).catch({}).default({});

type ThemeEditable = z.infer<typeof themeEditableSchema>;

export type { ThemeApi, ThemeEditable };
export { themeApiSchema, themeEditableSchema };
