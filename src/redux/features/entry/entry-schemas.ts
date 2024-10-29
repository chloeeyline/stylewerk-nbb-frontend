import { z } from "zod";

const entryItemSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    isPublic: z.boolean(),
    tags: z.string().nullable(),
    createdAt: z.number().int().safe().nonnegative(),
    lastUpdatedAt: z.number().int().safe().nonnegative(),
    templateName: z.string(),
    username: z.string(),
    owned: z.boolean(),
});

const entryItemsSchema = entryItemSchema.array();

const entryFolderSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    items: entryItemsSchema,
    count: z.number().int().safe().nonnegative(),
});

const entryFoldersSchema = entryFolderSchema.array();

type EntrySearchParams = {
    name?: string;
    username?: string;
    templateName?: string;
    tags?: string;
    includePublic?: "true" | "false";
};

type EntryItem = z.infer<typeof entryItemSchema>;
type EntryItems = z.infer<typeof entryItemsSchema>;
type EntryFolder = z.infer<typeof entryFolderSchema>;
type EntryFolders = z.infer<typeof entryFoldersSchema>;

export { entryFolderSchema, entryFoldersSchema, entryItemSchema, entryItemsSchema };

export type { EntryFolder, EntryFolders, EntryItem, EntryItems, EntrySearchParams };
