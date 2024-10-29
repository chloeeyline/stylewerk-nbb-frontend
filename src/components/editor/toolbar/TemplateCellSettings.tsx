import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import InlineScroller from "~/components/layout/InlineScroller";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelperSettings from "./InputHelperSettings";
import { useTranslation } from "react-i18next";

export default function TemplateCellSettings() {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const selectedCellSettings = () => {
        if (
            editor.selectedTemplateRow.length == 0 ||
            editor.selectedTemplateCell.length == 0 ||
            editor.data === null
        ) {
            return null;
        }

        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        if (!row) return null;
        const cell = row?.items.find((cell) => cell.templateID === editor.selectedTemplateCell);
        return cell ?? null;
    };

    const selectedRowSettings = () => {
        if (editor.selectedTemplateRow.length == 0 || editor.data === null) return null;
        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        return row ?? null;
    };

    const dispatchCellSettings = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        value: boolean | number | string,
    ) => {
        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: value,
            }),
        );
    };

    return (
        <fieldset className="fieldset">
            <legend className="legend">{t("common.cell_one")}</legend>
            <InlineScroller>
                <SelectField
                    label={t("editor.inputHelper")}
                    name="inputHelper"
                    value={selectedCellSettings()?.template.inputHelper ?? 1}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                    options={[
                        ["0", "Test"],
                        ["1", t("editor.inputHelperStatic")],
                        ["3", t("editor.inputHelperText")],
                        ["4", t("editor.inputHelperNumber")],
                        ["5", t("editor.inputHelperCheckbox")],
                        ["6", t("editor.inputHelperDatetime")],
                        ["7", t("editor.inputHelperColor")],
                        ["8", t("editor.inputHelperList")],
                    ]}
                    style={{ minInlineSize: "15ch" }}
                />
                <InputField
                    type="text"
                    label={t("editor.ihOptionText")}
                    name="text"
                    maxLength={100}
                    value={selectedCellSettings()?.template.text ?? ""}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                    style={{ minInlineSize: "15ch" }}
                />
                <InputField
                    type="text"
                    label={t("editor.ihOptionDescription")}
                    name="description"
                    maxLength={100}
                    value={selectedCellSettings()?.template.description ?? ""}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                    style={{ minInlineSize: "25ch" }}
                />
                <div className="d-grid gap-1" style={{ alignItems: "center" }}>
                    <InputField
                        type="checkbox"
                        label={t("editor.ihOptionHideEmptyCell")}
                        name="hideOnEmpty"
                        checked={selectedCellSettings()?.template.hideOnEmpty ?? false}
                        onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                    />
                    <InputField
                        type="checkbox"
                        label={t("editor.ihOptionIsRequired")}
                        name="isRequired"
                        maxLength={100}
                        checked={selectedCellSettings()?.template.isRequired ?? false}
                        onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                    />
                </div>
                <InputHelperSettings cell={selectedCellSettings()} row={selectedRowSettings()} />
            </InlineScroller>
        </fieldset>
    );
}
