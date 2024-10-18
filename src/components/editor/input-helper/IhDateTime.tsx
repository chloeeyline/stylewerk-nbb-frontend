import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setEntryCell, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

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
            required={cell.template.isRequired}
            disabled={isReadOnly}
            name="dateTime"
            label={cell.template.text ?? ""}
            placeholder={cell.template.text ?? ""}
            type={getType(metadata.data.type)}
            value={data.data.value ?? metadata.data.value ?? ""}
            min={metadata.data?.min}
            max={metadata.data?.max}
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
    );
};

export const IhDateTimeSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(
            setTemplateCell({
                type: "metaData",
                value: JSON.stringify(metadata.data),
            }),
        );
    }, []);

    if (metadata.success === false) return null;

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
                            ...metadata.data,
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
                            ...metadata.data,
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
                type={getType(metadata.data.type)}
                value={metadata.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Maximalwert"}
                useNameAsIs={true}
                name="max"
                type={getType(metadata.data.type)}
                value={metadata.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Standartwert"}
                useNameAsIs={true}
                name="value"
                type={getType(metadata.data.type)}
                value={metadata.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Datum"}
                useNameAsIs={true}
                name="type"
                type="radio"
                value="0"
                checked={metadata.data.type == 0}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Monat"}
                useNameAsIs={true}
                name="type"
                type="radio"
                value="1"
                checked={metadata.data.type == 1}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Woche"}
                useNameAsIs={true}
                name="type"
                type="radio"
                value="2"
                checked={metadata.data.type == 2}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Zeit"}
                useNameAsIs={true}
                name="type"
                type="radio"
                value="3"
                checked={metadata.data.type == 3}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
