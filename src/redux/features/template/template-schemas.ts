import { z } from "zod";
import { pagingSchema } from "~/schemas/paging";
import { shareVisibilitySchema } from "~/schemas/share-visibility";

const templateItemSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    tags: z.string().nullable(),
    createdAt: z.number().int().safe().nonnegative(),
    lastUpdatedAt: z.number().int().safe().nonnegative(),
    username: z.string(),
    visibility: shareVisibilitySchema,
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
    publicShared?: "true" | "false";
    shared?: "true" | "false";
    includeOwned?: "true" | "false";
    directUser?: "true" | "false";
};

type TemplateItem = z.infer<typeof templateItemSchema>;
type TemplatePaging = z.infer<typeof templatePagingSchema>;

export { templateItemSchema, templatePagingSchema };

export type { TemplateItem, TemplatePaging, TemplateSearchParams };
