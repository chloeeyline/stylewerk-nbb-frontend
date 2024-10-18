import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setEntryCell, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const ihMetaDataSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
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

export const IhColor = ({ cell, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = transformMetaData(cell.template.metaData);
    const data = transformData(cell.data);
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    return (
        <InputField
            required={cell.template.isRequired}
            disabled={isReadOnly}
            name="dateTime"
            label={cell.template.text ?? ""}
            placeholder={cell.template.text ?? ""}
            type="color"
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
    );
};

export const IhColorSettings = ({ cell }: { cell: EntryCell }) => {
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
        <InputField
            label={"Standartwert"}
            useNameAsIs={true}
            name="value"
            type="color"
            value={temp.data.value ?? ""}
            onChange={dispatchCellSettings}
        />
    );
};
