import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setEntryCell, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const ihMetaDataSchema = z
    .object({
        min: z.string().optional().catch(undefined).default(undefined),
        max: z.string().optional().catch(undefined).default(undefined),
        value: z.string().optional().catch(undefined).default(undefined),
        type: z.number().int().safe().nonnegative().catch(0).default(0),
    })
    .strip();

const ihDataSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

const transformMetaData = (input: unknown) => {
    try {
        if (typeof input !== "string") throw new Error("foo");
        return ihMetaDataSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihMetaDataSchema.safeParse({});
    }
};

const transformData = (input: unknown) => {
    try {
        if (typeof input !== "string") throw new Error("foo");
        return ihDataSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihDataSchema.safeParse({});
    }
};

const getType = (type: number) => {
    switch (type) {
        case 0:
            return "date";
        case 1:
            return "month";
        case 2:
            return "week";
        default:
            return "time";
    }
};

export const IhDateTime = ({ cell, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = transformMetaData(cell.template.metaData);
    const data = transformData(cell.data);
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    return (
        <>
            <input
                type={getType(metadata.data.type)}
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                min={metadata.data?.min}
                max={metadata.data?.max}
                value={data.data.value ?? metadata.data.value ?? ""}
                onChange={(e) => {
                    if (editor.isPreview) return;
                    if (e.target.value.length === 0) {
                        dispatch(setEntryCell(null));
                        return;
                    }
                    var temp = {
                        ...data.data,
                        value: e.target.value,
                    };
                    dispatch(setEntryCell(JSON.stringify(temp)));
                }}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhDateTimeSettings = ({ cell }: { cell: EntryCell }) => {
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
            case "value":
                dispatch(
                    setTemplateCell({
                        type: "metaData",
                        value: JSON.stringify({
                            ...temp.data,
                            [e.target.name]: e.target.value,
                        }),
                    }),
                );
                break;
            case "type":
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
                type={getType(temp.data.type)}
                value={temp.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Maximalwert"}
                useNameAsIs={true}
                name="max"
                type={getType(temp.data.type)}
                value={temp.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Standartwert"}
                useNameAsIs={true}
                name="value"
                type={getType(temp.data.type)}
                value={temp.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Datum"}
                useNameAsIs={true}
                name="type"
                type="radio"
                checked={temp.data.type == 0}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Monat"}
                useNameAsIs={true}
                name="type"
                type="radio"
                checked={temp.data.type == 1}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Woche"}
                useNameAsIs={true}
                name="type"
                type="radio"
                checked={temp.data.type == 2}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Zeit"}
                useNameAsIs={true}
                name="type"
                type="radio"
                checked={temp.data.type == 3}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
