import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setData, setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

const ihMetaDataSchema = z
    .object({
        min: z.number().safe().optional().catch(undefined).default(undefined),
        max: z.number().safe().optional().catch(undefined).default(undefined),
        step: z.number().safe().optional().catch(undefined).default(undefined),
        integer: z.boolean().catch(false).default(false),
    })
    .strip();

const ihDataSchema = z
    .object({
        value: z.number().safe().optional().catch(undefined).default(undefined),
    })
    .strip();

export const IhNumber = ({ cell, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    if (editor.isPreview === true && editor.isTemplate === false) {
        return (
            <div>
                {data.data.value}
                <p>{cell.template.text ?? ""}</p>
            </div>
        );
    }

    return (
        <InputField
            type="number"
            label={cell.template.text ?? ""}
            name="number"
            required={cell.template.isRequired}
            disabled={isReadOnly}
            placeholder={cell.template.text ?? ""}
            value={data.data.value ?? ""}
            min={metadata.data?.min}
            max={metadata.data?.max}
            step={metadata.data?.step}
            onChange={(e) => {
                if (editor.isPreview) return;
                if (e.target.value.length === 0) {
                    dispatch(setData(null));
                    return;
                }
                var temp = {
                    ...data.data,
                    value: metadata.data.integer
                        ? Number.parseInt(e.target.value)
                        : Number.parseFloat(e.target.value),
                };
                dispatch(setData(JSON.stringify(temp)));
            }}
        />
    );
};

export const IhNumberSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(setMetadata(JSON.stringify(metadata.data)));
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "min":
            case "max":
            case "step":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: Number(e.target.value),
                        }),
                    ),
                );
                break;
            case "integer":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.checked,
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    return (
        <>
            <InputField
                type="number"
                label="Minimalwert"
                name="min"
                value={metadata.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="number"
                label="Maximalwert"
                name="max"
                value={metadata.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="number"
                label="Schrittgröße"
                name="step"
                value={metadata.data.step ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="checkbox"
                label="Ganzzahlswert"
                name="integer"
                checked={metadata.data.integer}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
