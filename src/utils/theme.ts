import { z } from "zod";

const themeSchema = z.object({
    id: z.string(),
    name: z.string(),
    base: z
        .union([z.literal("light"), z.literal("dark"), z.literal("system")])
        .catch("system")
        .default("system"),
    data: z.string(),
});

type Theme = z.infer<typeof themeSchema>;

const themeEditableSchema = z.record(z.string(), z.string());

type ThemeEditable = z.infer<typeof themeEditableSchema>;

const builtInThemes: Theme[] = [
    {
        id: "dark",
        name: "Dark",
        base: "dark",
        data: "",
    },
    {
        id: "light",
        name: "Light",
        base: "light",
        data: "",
    },
    {
        id: "system",
        name: "System",
        base: "system",
        data: "",
    },
    {
        id: "colorful",
        name: "Colorful",
        base: "light",
        data: "",
    },
];

const getThemes = async () => {};

export type { Theme, ThemeEditable };
export { themeSchema, themeEditableSchema, getThemes };
