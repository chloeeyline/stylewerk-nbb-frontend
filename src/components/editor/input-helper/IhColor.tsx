import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { CallSetData, selectEditor, setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

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

export const IhColor = ({ cell, row, isReadOnly }: InputHelperProps) => {
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
            name="color"
            label={cell.template.text ?? ""}
            placeholder={cell.template.text ?? ""}
            type="color"
            value={data.data.value ?? metadata.data.value ?? ""}
            onChange={(e) => {
                CallSetData(dispatch, editor, cell, row, {
                    ...data.data,
                    value: e.target.value,
                });
            }}
        />
    );
};

export const IhColorSettings = ({ cell }: { cell: EntryCell }) => {
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
            case "value":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.value,
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    return (
        <InputField
            type="color"
            label="Standartwert"
            name="value"
            value={metadata.data.value ?? ""}
            onChange={dispatchCellSettings}
        />
    );
};
