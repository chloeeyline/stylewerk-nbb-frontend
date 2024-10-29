import { z } from "zod";

const ihDataCheckboxSchema = z
    .object({
        value: z.boolean().optional().catch(undefined).default(undefined),
    })
    .strip();

const ihDataColorSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

const ihDataDateTimeSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

const ihDataListSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

const ihDataNumberSchema = z
    .object({
        value: z
            .union([z.number().safe(), z.string()])
            .optional()
            .catch(undefined)
            .default(undefined),
    })
    .strip();

const ihDataTextSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

export {
    ihDataCheckboxSchema,
    ihDataColorSchema,
    ihDataDateTimeSchema,
    ihDataListSchema,
    ihDataNumberSchema,
    ihDataTextSchema,
};
