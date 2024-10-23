import { useEffect } from "react";
import InputField from "~/components/forms/InputField";
import { ihDataColorSchema } from "~/redux/features/editor/editor-data-schema";
import { ihMetaDataColorSchema } from "~/redux/features/editor/editor-metadata-schema";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { CallSetData, selectEditor, setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhColor = ({ cell, row, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataColorSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataColorSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    const getValue = () => {
        const value = data.data?.value ?? metadata.data?.value ?? "";

        if (value.length !== 7 || value.startsWith("#") === false) {
            return undefined;
        }

        return value;
    };

    const value = getValue();

    if (editor.isPreview === true) {
        return (
            <div
                className="d-grid grid-template-columns rounded-0"
                style={{
                    "--grid-template-columns": "auto auto",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "backgroundColor": value,
                }}>
                <div className="bg-base-100 rounded-0 p-i-1">
                    {cell.template.text !== null ? (
                        <h4 className="d-inline">
                            {cell.template.text}
                            {typeof value !== "undefined" ? <>:&nbsp;</> : null}
                        </h4>
                    ) : null}
                    {typeof value !== "undefined" ? <span>{value}</span> : null}
                </div>
            </div>
        );
    }

    return (
        <InputField
            required={cell.template.isRequired}
            disabled={isReadOnly}
            name="color"
            label={cell.template.text ?? ""}
            placeholder={cell.template.text ?? ""}
            type="color"
            value={value}
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
    const metadata = ihMetaDataColorSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

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
