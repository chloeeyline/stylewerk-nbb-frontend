import { z } from "zod";

const templateCellSchema = z.object({
    id: z.string().uuid(),
    inputHelper: z.number().safe().int().nonnegative(),
    hideOnEmpty: z.boolean(),
    isRequired: z.boolean(),
    text: z.string().nullable(),
    description: z.string().nullable(),
    metaData: z.string().nullable(),
});

const templateRowSchema = z.object({
    id: z.string().uuid(),
    canWrapCells: z.boolean(),
    canRepeat: z.boolean(),
    hideOnNoInput: z.boolean(),
});

const templateSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    tags: z.string().nullable(),
});

const entryCellSchema = z.object({
    id: z.string().uuid(),
    templateID: z.string().uuid(),
    data: z.string().nullable(),
    template: templateCellSchema,
});

const entryRowSchema = z.object({
    id: z.string().uuid(),
    templateID: z.string().uuid(),
    template: templateRowSchema,
    items: z.array(entryCellSchema),
});

const editorSchema = z.object({
    id: z.string().uuid(),
    folderID: z.string().uuid().nullable(),
    templateID: z.string().uuid(),
    name: z.string().nullable(),
    tags: z.string().nullable(),
    isEncrypted: z.boolean(),
    template: templateSchema,
    items: z.array(entryRowSchema),
});

type Template = z.infer<typeof templateSchema>;
type TemplateCell = z.infer<typeof templateCellSchema>;
type TemplateRow = z.infer<typeof templateRowSchema>;
type EntryCell = z.infer<typeof entryCellSchema>;
type EntryRow = z.infer<typeof entryRowSchema>;
type Editor = z.infer<typeof editorSchema>;
type InputHelperProps = { cell: EntryCell; isReadOnly: boolean };

export {
    templateCellSchema,
    templateRowSchema,
    templateSchema,
    entryCellSchema,
    entryRowSchema,
    editorSchema,
};

export type { Template, TemplateCell, TemplateRow, EntryCell, EntryRow, Editor, InputHelperProps };
