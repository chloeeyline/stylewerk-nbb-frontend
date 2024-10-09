import { z } from "zod";
import { shareVisibilitySchema } from "~/schemas/share-visibility";

const entryItemSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    isEncrypted: z.boolean(),
    tags: z.string().nullable(),
    createdAt: z.number().int().safe().nonnegative(),
    lastUpdatedAt: z.number().int().safe().nonnegative(),
    templateName: z.string(),
    username: z.string(),
    visibility: shareVisibilitySchema,
});

const entryItemsSchema = entryItemSchema.array();

const entryFolderSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    items: entryItemsSchema,
});

const entryFoldersSchema = entryFolderSchema.array();

type EntrySearchParams = {
    name?: string;
    username?: string;
    templateName?: string;
    tags?: string;
    publicShared?: "true" | "false";
    shared?: "true" | "false";
    includeOwned?: "true" | "false";
    directUser?: "true" | "false";
};

type EntryItem = z.infer<typeof entryItemSchema>;
type EntryItems = z.infer<typeof entryItemsSchema>;
type EntryFolder = z.infer<typeof entryFolderSchema>;
type EntryFolders = z.infer<typeof entryFoldersSchema>;

export { entryFolderSchema, entryFoldersSchema, entryItemSchema, entryItemsSchema };

export type { EntryFolder, EntryFolders, EntryItem, EntryItems, EntrySearchParams };
