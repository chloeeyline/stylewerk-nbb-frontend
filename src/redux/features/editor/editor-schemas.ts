import { z } from "zod";

const templateCellSchema = z.object({
    id: z.string().uuid().nullable(),
    inputHelper: z.number().safe().int().nonnegative(),
    hideOnEmpty: z.boolean(),
    isRequired: z.boolean(),
    text: z.string().nullable(),
    description: z.string().nullable(),
    metaData: z.string().nullable(),
});

const templateRowSchema = z.object({
    id: z.string().uuid().nullable(),
    canWrapCells: z.boolean(),
    canRepeat: z.boolean(),
    hideOnNoInput: z.boolean(),
});

const templateSchema = z.object({
    id: z.string().uuid().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    tags: z.string().nullable(),
});

const entryCellSchema = z.object({
    id: z.string().uuid().nullable(),
    templateID: z.string().uuid(),
    data: z.string().nullable(),
    template: templateCellSchema.nullable(),
});

const entryRowSchema = z.object({
    id: z.string().uuid().nullable(),
    templateID: z.string().uuid(),
    template: templateRowSchema.nullable(),
    items: z.array(entryCellSchema),
});

const editorSchema = z.object({
    id: z.string().uuid().nullable(),
    folderID: z.string().uuid().nullable(),
    templateID: z.string().uuid().nullable(),
    name: z.string().nullable(),
    tags: z.string().nullable(),
    isEncrypted: z.boolean(),
    template: templateSchema.nullable(),
    items: z.array(entryRowSchema),
});

type Template = z.infer<typeof templateSchema>;
type TemplateCell = z.infer<typeof templateCellSchema>;
type TemplateRow = z.infer<typeof templateRowSchema>;
type EntryCell = z.infer<typeof entryCellSchema>;
type EntryRow = z.infer<typeof entryRowSchema>;
type Editor = z.infer<typeof editorSchema>;

export {
    templateCellSchema,
    templateRowSchema,
    templateSchema,
    entryCellSchema,
    entryRowSchema,
    editorSchema,
};

export type { Template, TemplateCell, TemplateRow, EntryCell, EntryRow, Editor };
