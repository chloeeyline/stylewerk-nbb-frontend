import { z } from "zod";

export const shareVisibilitySchema = z.enum(["None", "Directly", "Group", "Public"]);

export type ShareVisibility = z.infer<typeof shareVisibilitySchema>;
