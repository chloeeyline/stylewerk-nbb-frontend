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

const entryFoldersSchema = z
    .object({
        id: z.string().uuid().nullable(),
        name: z.string().nullable(),
        items: z.array(entryItemSchema),
    })
    .array();

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
type EntryFolders = z.infer<typeof entryFoldersSchema>;

export { entryItemSchema, entryFoldersSchema };

export type { EntryItem, EntryFolders, EntrySearchParams };
