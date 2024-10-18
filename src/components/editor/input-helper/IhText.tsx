import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setEntryCell, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
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

export const IhText = ({ cell, isReadOnly }: InputHelperProps) => {
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
        <>
            <textarea
                required={cell.template.isRequired}
                disabled={isReadOnly}
                name="text"
                placeholder={cell.template.text ?? ""}
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

export const IhTextSettings = ({ cell }: { cell: EntryCell }) => {
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
                            [e.target.name]: e.target.value,
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
            value={metadata.data.value ?? false}
            onChange={dispatchCellSettings}
        />
    );
};
