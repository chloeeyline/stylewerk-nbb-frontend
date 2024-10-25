import { useEffect } from "react";
import InputField from "~/components/forms/InputField";
import { ihDataColorSchema } from "~/redux/features/editor/editor-data-schema";
import { useInputHelper, ValidColorValue } from "~/redux/features/editor/editor-hook";
import { ihMetaDataColorSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhColor = ({ cell, row, isReadOnly, error }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const { setData } = useInputHelper(cell, row);
    const metadata = ihMetaDataColorSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataColorSchema.safeParse(saveParseEmptyObject(cell.data));
    const value = ValidColorValue(data?.data?.value, metadata?.data?.value);
    useEffect(() => {
        if (
            data.success === false ||
            metadata.success === false ||
            (editor.isTemplate === false && typeof data.data.value !== "undefined")
        )
            return;
        setData({
            ...data.data,
            value: value,
        });
    }, []);

    if (metadata.success === false) return null;
    if (data.success === false) return null;

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
            error={error}
            type="color"
            value={value}
            onChange={(e) => {
                setData({
                    ...data.data,
                    value: e.target.value,
                });
            }}
        />
    );
};

export const IhColorSettings = ({ cell, row }: InputHelperProps) => {
    const { setMetaData } = useInputHelper(cell, row);
    const metadata = ihMetaDataColorSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const value = ValidColorValue(undefined, metadata?.data?.value);

    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMetaData({
            ...metadata.data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <InputField
            type="color"
            label="Standartwert"
            name="value"
            value={value}
            onChange={dispatchCellSettings}
        />
    );
};
