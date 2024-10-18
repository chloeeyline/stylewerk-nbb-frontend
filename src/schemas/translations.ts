import { z } from "zod";

const translationSchema = z.object({
    code: z.string().max(5),
    name: z.string(),
    data: z.string().nullable(),
});

type Translation = z.infer<typeof translationSchema>;

const translationContentSchema = z.record(z.string(), z.record(z.string(), z.string()));

type TranslationContent = z.infer<typeof translationContentSchema>;

export type { Translation, TranslationContent };
export { translationSchema, translationContentSchema };
