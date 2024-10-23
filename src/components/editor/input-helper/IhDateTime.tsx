import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import { ihDataDateTimeSchema } from "~/redux/features/editor/editor-data-schema";
import { ihMetaDataDateTimeSchema } from "~/redux/features/editor/editor-metadata-schema";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { CallSetData, selectEditor, setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

const getType = (type: number) => {
    switch (type) {
        case 0:
            return "date";
        case 1:
            return "month";
        case 2:
            return "week";
        default:
            return "time";
    }
};

export const IhDateTime = ({ cell, row, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataDateTimeSchema.safeParse(
        saveParseEmptyObject(cell.template.metaData),
    );
    const data = ihDataDateTimeSchema.safeParse(saveParseEmptyObject(cell.data));
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
            type={getType(metadata.data.type)}
            label={cell.template.text ?? ""}
            name="dateTime"
            required={cell.template.isRequired}
            disabled={isReadOnly}
            placeholder={cell.template.text ?? ""}
            value={data.data.value ?? metadata.data.value ?? ""}
            min={metadata.data?.min}
            max={metadata.data?.max}
            onChange={(e) => {
                CallSetData(dispatch, editor, cell, row, {
                    ...data.data,
                    value: e.target.value,
                });
            }}
        />
    );
};

export const IhDateTimeSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const metadata = ihMetaDataDateTimeSchema.safeParse(
        saveParseEmptyObject(cell.template.metaData),
    );

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(setMetadata(JSON.stringify(metadata.data)));
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "min":
            case "max":
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
            case "type":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: Number(e.target.value),
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    return (
        <>
            <InputField
                type={getType(metadata.data.type)}
                label={t("editor.ihOptionMinValue")}
                name="min"
                value={metadata.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type={getType(metadata.data.type)}
                label={t("editor.ihOptionMaxValue")}
                name="max"
                value={metadata.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type={getType(metadata.data.type)}
                label={t("editor.ihOptionDefaultValue")}
                name="value"
                value={metadata.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <div
                className="d-grid grid-template-columns gap-1"
                style={{ "--grid-template-columns": "1fr 1fr", "alignItems": "center" }}>
                <InputField
                    type="radio"
                    label={t("editor.ihOptionDatetimeDate")}
                    name="type"
                    value="0"
                    checked={metadata.data.type == 0}
                    onChange={dispatchCellSettings}
                />
                <InputField
                    type="radio"
                    label={t("editor.ihOptionDatetimeMonth")}
                    name="type"
                    value="1"
                    checked={metadata.data.type == 1}
                    onChange={dispatchCellSettings}
                />
                <InputField
                    type="radio"
                    label={t("editor.ihOptionDatetimeWeek")}
                    name="type"
                    value="2"
                    checked={metadata.data.type == 2}
                    onChange={dispatchCellSettings}
                />
                <InputField
                    type="radio"
                    label={t("editor.ihOptionDatetimeTime")}
                    name="type"
                    value="3"
                    checked={metadata.data.type == 3}
                    onChange={dispatchCellSettings}
                />
            </div>
        </>
    );
};
