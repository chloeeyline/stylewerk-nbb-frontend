import { z } from "zod";
import { pagingSchema } from "~/schemas/paging";
import { shareVisibilitySchema } from "~/schemas/share-visibility";

const templateCellSchema = z.object({
    id: z.string().nullable(),
    inputHelper: z.number(),
    hideOnEmpty: z.boolean(),
    isRequired: z.boolean(),
    text: z.string().nullable(),
    metaData: z.string().nullable(),
});

const templateRowSchema = z.object({
    id: z.string().nullable(),
    canWrapCells: z.boolean(),
    canRepeat: z.boolean(),
    hideOnNoInput: z.boolean(),
    items: z.array(templateCellSchema),
});

const templateSchema = z.object({
    id: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable(),
    tags: z.string().nullable(),
    items: z.array(templateRowSchema),
});

const templateItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    tags: z.string().nullable(),
    createdAt: z.number().int().safe().positive(),
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

type Template = z.infer<typeof templateSchema>;
type TemplateItem = z.infer<typeof templateItemSchema>;
type TemplateRow = z.infer<typeof templateRowSchema>;
type TemplateCell = z.infer<typeof templateCellSchema>;
type TemplatePaging = z.infer<typeof templatePagingSchema>;

export {
    templateSchema,
    templateItemSchema,
    templateRowSchema,
    templateCellSchema,
    templatePagingSchema,
};

export type {
    Template,
    TemplateItem,
    TemplateRow,
    TemplateCell,
    TemplatePaging,
    TemplateSearchParams,
};
