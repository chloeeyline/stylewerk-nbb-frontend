import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import TextareaField from "~/components/forms/TextareaField";
import { ihDataTextSchema } from "~/redux/features/editor/editor-data-schema";
import { useInputHelper } from "~/redux/features/editor/editor-hook";
import { ihMetaDataTextSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhText = ({ cell, row, isReadOnly, error }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const { setData } = useInputHelper(cell, row);
    const metadata = ihMetaDataTextSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataTextSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    if (editor.isPreview === true && editor.isTemplate === false) {
        return (
            <div>
                {cell.template.text !== null ? <h4>{cell.template.text}</h4> : null}
                <p
                    className={
                        typeof metadata.data.lineShown === "number" ? "overflow-block-auto" : undefined
                    }
                    style={{
                        maxBlockSize:
                            typeof metadata.data.lineShown === "number"
                                ? `calc(${metadata.data.lineShown} * (1em + 0.5rem))`
                                : undefined,
                    }}>
                    {data.data.value}
                </p>
            </div>
        );
    }

    return (
        <TextareaField
            label={cell.template.text ?? ""}
            name="text"
            required={cell.template.isRequired}
            disabled={isReadOnly}
            placeholder={cell.template.text ?? ""}
            value={data.data.value ?? ""}
            maxLength={metadata.data.maxLenght}
            error={error}
            onChange={(e) => {
                setData({
                    ...data.data,
                    value: e.target.value,
                });
            }}
        />
    );
};

export const IhTextSettings = ({ cell, row }: InputHelperProps) => {
    const { setMetaData } = useInputHelper(cell, row);
    const { t } = useTranslation();
    const metadata = ihMetaDataTextSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "maxLenght":
            case "lineShown":
                setMetaData({
                    ...metadata.data,
                    [e.target.name]: Number.parseInt(e.target.value),
                });
                break;
            default:
                return;
        }
    };

    return (
        <>
            <InputField
                type="number"
                label={t("editor.ihOptionMaxLenght")}
                name="maxLenght"
                value={metadata.data.maxLenght ?? undefined}
                onChange={dispatchCellSettings}
            />

            <InputField
                type="number"
                label={t("editor.ihOptionRowsShown")}
                name="lineShown"
                value={metadata.data.lineShown ?? undefined}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
