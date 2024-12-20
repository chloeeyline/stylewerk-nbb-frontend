import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import { ihDataNumberSchema } from "~/redux/features/editor/editor-data-schema";
import { useInputHelper } from "~/redux/features/editor/editor-hook";
import { ihMetaDataNumberSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

export const IhNumber = ({ cell, row, isReadOnly, error }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const { setData } = useInputHelper(cell, row);
    const metadata = ihMetaDataNumberSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataNumberSchema.safeParse(saveParseEmptyObject(cell.data));

    useEffect(() => {
        if (
            data.success === false ||
            metadata.success === false ||
            (editor.isTemplate === false && typeof data.data.value !== "undefined")
        )
            return;
        setData({
            value: metadata.data.value ?? undefined,
        });
    }, []);

    if (metadata.success === false) return null;
    if (data.success === false) return null;

    if (editor.isPreview === true && editor.isTemplate === false) {
        return (
            <div className="d-flex" style={{ alignItems: "baseline" }}>
                {cell.template.text !== null ? <h4>{cell.template.text}:&nbsp;</h4> : null}
                <span>{data.data.value}</span>
            </div>
        );
    }

    return (
        <InputField
            type="number"
            label={cell.template.text ?? ""}
            name="number"
            required={cell.template.isRequired}
            disabled={isReadOnly}
            placeholder={cell.template.text ?? ""}
            value={data.data.value ?? metadata.data.value ?? ""}
            error={error}
            min={metadata.data?.min}
            max={metadata.data?.max}
            step={metadata.data?.step}
            onChange={(e) => {
                if (e.target.value === "") {
                    setData({
                        ...data.data,
                        value: "",
                    });
                    return;
                }

                const value = metadata.data.integer
                    ? Number.parseInt(e.target.value)
                    : Number(e.target.value);

                setData({
                    ...data.data,
                    value,
                });
            }}
        />
    );
};

export const IhNumberSettings = ({ cell, row }: InputHelperProps) => {
    const { t } = useTranslation();
    const { setMetaData } = useInputHelper(cell, row);

    const metadata = ihMetaDataNumberSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "value":
            case "min":
            case "max":
            case "step":
                setMetaData({
                    ...metadata.data,
                    [e.target.name]: e.target.value === "" ? undefined : Number(e.target.value),
                });
                break;
            case "integer":
                setMetaData({
                    ...metadata.data,
                    [e.target.name]: e.target.checked,
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
                label={t("editor.ihOptionDefaultValue")}
                name="value"
                value={metadata.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="number"
                label={t("editor.ihOptionMinValue")}
                name="min"
                value={metadata.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="number"
                label={t("editor.ihOptionMaxValue")}
                name="max"
                value={metadata.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="number"
                label={t("editor.ihOptionStepSize")}
                name="step"
                value={metadata.data.step ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="checkbox"
                label={t("editor.ihOptionInteger")}
                name="integer"
                checked={metadata.data.integer}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
