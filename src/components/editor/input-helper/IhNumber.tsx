import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setEntryCell, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const ihNumberMetaDataSchema = z
    .object({
        min: z.number().safe().optional().catch(undefined).default(undefined),
        max: z.number().safe().optional().catch(undefined).default(undefined),
        step: z.number().safe().optional().catch(undefined).default(undefined),
        integer: z.boolean().catch(false).default(false),
    })
    .strip();

const ihNumberDataSchema = z
    .object({
        value: z.number().safe().optional().catch(undefined).default(undefined),
    })
    .strip();

const transformMetaData = (input: unknown) => {
    try {
        if (typeof input !== "string") throw new Error("foo");
        return ihNumberMetaDataSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihNumberMetaDataSchema.safeParse({});
    }
};

const transformData = (input: unknown) => {
    try {
        if (typeof input !== "string") throw new Error("foo");
        return ihNumberDataSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihNumberDataSchema.safeParse({});
    }
};

export const IhNumber = ({ cell, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = transformMetaData(cell.template.metaData);
    const data = transformData(cell.data);
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    if (editor.isPreview === true) {
        return (
            <div>
                {data.data.value}
                <p>{cell.template.text ?? ""}</p>
            </div>
        );
    }

    return (
        <>
            <InputField
                required={cell.template.isRequired}
                disabled={isReadOnly}
                name="number"
                label={cell.template.text ?? ""}
                placeholder={cell.template.text ?? ""}
                type="number"
                value={data.data.value ?? ""}
                min={metadata.data?.min}
                max={metadata.data?.max}
                step={metadata.data?.step}
                onChange={(e) => {
                    if (editor.isPreview) return;
                    if (e.target.value.length === 0) {
                        dispatch(setEntryCell(null));
                        return;
                    }
                    var temp = {
                        ...data.data,
                        value: metadata.data.integer
                            ? Number.parseInt(e.target.value)
                            : Number.parseFloat(e.target.value),
                    };
                    dispatch(setEntryCell(JSON.stringify(temp)));
                }}
            />
        </>
    );
};

export const IhNumberSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const temp = transformMetaData(cell.template.metaData);

    useEffect(() => {
        if (temp.success === false) return;
        dispatch(
            setTemplateCell({
                type: "metaData",
                value: JSON.stringify(temp.data),
            }),
        );
    }, []);

    if (temp.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "min":
            case "max":
            case "step":
                dispatch(
                    setTemplateCell({
                        type: "metaData",
                        value: JSON.stringify({
                            ...temp.data,
                            [e.target.name]: Number(e.target.value),
                        }),
                    }),
                );
                break;
            case "integer":
                dispatch(
                    setTemplateCell({
                        type: "metaData",
                        value: JSON.stringify({
                            ...temp.data,
                            [e.target.name]: e.target.checked,
                        }),
                    }),
                );
                break;
            default:
                return;
        }
    };

    return (
        <>
            <InputField
                label={"Minimalwert"}
                useNameAsIs={true}
                name="min"
                type="number"
                value={temp.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Maximalwert"}
                useNameAsIs={true}
                name="max"
                type="number"
                value={temp.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Schrittgröße"}
                useNameAsIs={true}
                name="step"
                type="number"
                value={temp.data.step ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Ganzzahlswert"}
                useNameAsIs={true}
                name="integer"
                type="checkbox"
                checked={temp.data.integer}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
