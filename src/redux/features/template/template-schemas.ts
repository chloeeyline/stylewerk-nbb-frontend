import { z } from "zod";
import { pagingSchema } from "~/schemas/paging";

const templateItemSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    isPublic: z.boolean(),
    description: z.string().nullable(),
    tags: z.string().nullable(),
    createdAt: z.number().int().safe().nonnegative(),
    lastUpdatedAt: z.number().int().safe().nonnegative(),
    username: z.string(),
    owned: z.boolean(),
});

const templatePagingSchema = z.object({
    paging: pagingSchema,
    items: z.array(templateItemSchema),
});

type TemplateSearchParams = {
    name?: string;
    username?: string;
    description?: string;
    tags?: string;
    includePublic?: "true" | "false";
};

type TemplateItem = z.infer<typeof templateItemSchema>;
type TemplatePaging = z.infer<typeof templatePagingSchema>;

export { templateItemSchema, templatePagingSchema };

export type { TemplateItem, TemplatePaging, TemplateSearchParams };
