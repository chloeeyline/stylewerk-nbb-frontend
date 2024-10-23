import { useEffect } from "react";
import InputField from "~/components/forms/InputField";
import { useInputHelper } from "~/redux/features/editor/editor-hook";
import { ihMetaDataStaticSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhStatic = ({ cell }: InputHelperProps) => {
    const metadata = ihMetaDataStaticSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    if (metadata.success === false) return null;

    return (
        <div style={{ color: metadata.data.color ?? "", fontSize: metadata.data.fontsize ?? "" }}>
            {cell.template.text ?? ""}
        </div>
    );
};

export const IhStaticSettings = ({ cell, row }: InputHelperProps) => {
    const { setMetaData } = useInputHelper(cell, row);
    const metadata = ihMetaDataStaticSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
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
                value={metadata.data.color ?? ""}
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
