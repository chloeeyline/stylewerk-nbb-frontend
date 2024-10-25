import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import { ihDataCheckboxSchema } from "~/redux/features/editor/editor-data-schema";
import { useInputHelper } from "~/redux/features/editor/editor-hook";
import { ihMetaDataCheckboxSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhCheckbox = ({ cell, row, isReadOnly, error }: InputHelperProps) => {
    const { setData } = useInputHelper(cell, row);
    const metadata = ihMetaDataCheckboxSchema.safeParse(
        saveParseEmptyObject(cell.template.metaData),
    );
    const data = ihDataCheckboxSchema.safeParse(saveParseEmptyObject(cell.data));

    if (metadata.success === false) return null;
    if (data.success === false) return null;

    return (
        <div className="d-grid" style={{ alignItems: "center" }}>
            <InputField
                type="checkbox"
                label={cell.template.text ?? ""}
                name="checkbox"
                required={cell.template.isRequired}
                disabled={isReadOnly}
                error={error}
                placeholder={cell.template.text ?? ""}
                checked={data.data?.value ?? metadata.data.value ?? false}
                onChange={(e) => {
                    setData({
                        ...data.data,
                        value: e.target.checked,
                    });
                }}
            />
        </div>
    );
};

export const IhCheckboxSettings = ({ cell, row }: InputHelperProps) => {
    const { t } = useTranslation();
    const { setMetaData } = useInputHelper(cell, row);
    const metadata = ihMetaDataCheckboxSchema.safeParse(
        saveParseEmptyObject(cell.template.metaData),
    );

    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);
    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        setMetaData({
            ...metadata.data,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <InputField
            type="checkbox"
            label={t("editor.ihOptionDefaultValue")}
            name="value"
            checked={metadata.data.value ?? false}
            onChange={dispatchCellSettings}
        />
    );
};
