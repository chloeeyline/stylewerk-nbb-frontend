import { z } from "zod";

const themeApiSchema = z.object({
    id: z.string(),
    name: z.string(),
    base: z.union([z.literal("light"), z.literal("dark"), z.literal("system")]),
    data: z.string().nullable(),
});

type ThemeApi = z.infer<typeof themeApiSchema>;

const themeSchema = z.record(z.string(), z.string()).catch({}).default({});

type Theme = z.infer<typeof themeSchema>;

const completeThemeSchema = themeApiSchema.extend({
    data: themeSchema,
});

type CompleteTheme = z.infer<typeof completeThemeSchema>;

export type { ThemeApi, Theme, CompleteTheme };
export { themeApiSchema, themeSchema, completeThemeSchema };
