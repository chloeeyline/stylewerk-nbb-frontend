import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setEntryCell, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

const ihMetaDataSchema = z
    .object({
        value: z.boolean().catch(false).default(false),
    })
    .strip();

const ihDataSchema = z
    .object({
        value: z.boolean().optional().catch(undefined).default(undefined),
    })
    .strip();

export const IhCheckbox = ({ cell, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    return (
        <InputField
            required={cell.template.isRequired}
            disabled={isReadOnly}
            name="checkbox"
            label={cell.template.text ?? ""}
            placeholder={cell.template.text ?? ""}
            type="checkbox"
            checked={data.data.value ?? metadata.data.value ?? false}
            onChange={(e) => {
                if (editor.isPreview) return;
                if (e.target.value.length === 0) {
                    dispatch(setEntryCell(null));
                    return;
                }
                var temp = {
                    ...data.data,
                    value: e.target.checked,
                };
                dispatch(setEntryCell(JSON.stringify(temp)));
            }}
        />
    );
};

export const IhCheckboxSettings = ({ cell }: { cell: EntryCell }) => {
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
            case "value":
                dispatch(
                    setTemplateCell({
                        type: "metaData",
                        value: JSON.stringify({
                            ...metadata.data,
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
        <InputField
            label={"Standartwert"}
            useNameAsIs={true}
            name="value"
            type="checkbox"
            checked={metadata.data.value ?? false}
            onChange={dispatchCellSettings}
        />
    );
};
