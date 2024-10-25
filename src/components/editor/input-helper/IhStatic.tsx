import { useEffect } from "react";
import InputField from "~/components/forms/InputField";
import { useInputHelper, ValidColorValue } from "~/redux/features/editor/editor-hook";
import { ihMetaDataStaticSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhStatic = ({ cell }: InputHelperProps) => {
    const metadata = ihMetaDataStaticSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const value = ValidColorValue(undefined, metadata?.data?.color);
    if (metadata.success === false) return null;

    return (
        <div
            style={{
                color: value,
                fontSize: metadata.data.fontsize ?? "",
            }}>
            {cell.template.text ?? ""}
        </div>
    );
};

export const IhStaticSettings = ({ cell, row }: InputHelperProps) => {
    const { setMetaData } = useInputHelper(cell, row);
    const metadata = ihMetaDataStaticSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const value = ValidColorValue(undefined, metadata?.data?.color);

    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "color":
                setMetaData({
                    ...metadata.data,
                    [e.target.name]: e.target.value,
                });
                break;
            case "fontsize":
                setMetaData({
                    ...metadata.data,
                    [e.target.name]: Number(e.target.value),
                });
                break;
            default:
                return;
        }
    };

    return (
        <>
            <InputField
                type="color"
                label="Textfarbe"
                name="color"
                value={value}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="number"
                label="Textgröße"
                name="fontsize"
                min={10}
                value={metadata.data.fontsize ?? ""}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
