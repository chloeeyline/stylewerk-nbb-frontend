import { z } from "zod";

const ihMetaDataCheckboxSchema = z
    .object({
        value: z.boolean().catch(false).default(false),
    })
    .strip();

const ihMetaDataColorSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

const ihMetaDataDateTimeSchema = z
    .object({
        min: z.string().optional().catch(undefined).default(undefined),
        max: z.string().optional().catch(undefined).default(undefined),
        value: z.string().optional().catch(undefined).default(undefined),
        type: z.number().int().safe().nonnegative().catch(0).default(0),
    })
    .strip();

const ihMetaDataListSchema = z
    .object({
        list: z
            .array(z.tuple([z.string(), z.string()]))
            .catch([[crypto.randomUUID(), ""]])
            .default([[crypto.randomUUID(), ""]]),
        value: z.string().optional().catch(undefined).default(undefined),
        display: z.string().catch("0").default("0"),
    })
    .strip();

const ihMetaDataNumberSchema = z
    .object({
        value: z.number().safe().optional().catch(undefined).default(undefined),
        min: z.number().safe().optional().catch(undefined).default(undefined),
        max: z.number().safe().optional().catch(undefined).default(undefined),
        step: z.number().safe().optional().catch(undefined).default(undefined),
        integer: z.boolean().catch(false).default(false),
    })
    .strip();

const ihMetaDataStaticSchema = z
    .object({
        color: z.string().optional().catch(undefined).default(undefined),
        fontsize: z.number().safe().optional().catch(undefined).default(undefined),
    })
    .strip();

const ihMetaDataTextSchema = z
    .object({
        lineShown: z.number().safe().nonnegative().optional().catch(undefined).default(undefined),
        maxLenght: z.number().safe().nonnegative().optional().catch(undefined).default(undefined),
    })
    .strip();

export {
    ihMetaDataCheckboxSchema,
    ihMetaDataColorSchema,
    ihMetaDataDateTimeSchema,
    ihMetaDataListSchema,
    ihMetaDataNumberSchema,
    ihMetaDataStaticSchema,
    ihMetaDataTextSchema,
};
