import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelperSettings from "./InputHelperSettings";

const TemplateCellSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const selectedCellSettings = () => {
        if (
            editor.selectedTemplateRow.length == 0 ||
            editor.selectedTemplateCell.length == 0 ||
            editor.data === null
        )
            return null;

        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        if (!row) return null;
        const cell = row?.items.find((cell) => cell.templateID === editor.selectedTemplateCell);
        return cell ?? null;
    };

    const dispatchCellSettingsCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
    };

    const dispatchCellSettings = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    ) => {
        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: e.target.value,
            }),
        );
    };

    return (
        <fieldset className="lrow">
            <legend>Zellen Einstellung</legend>
            <div>
                <InputField
                    label={"HideOnEmpty"}
                    name={"hideOnEmpty"}
                    useNameAsIs={true}
                    type="checkbox"
                    maxLength={100}
                    checked={selectedCellSettings()?.template.hideOnEmpty ?? false}
                    onChange={dispatchCellSettingsCheckbox}
                />
                <InputField
                    label={"IsRequired"}
                    name={"isRequired"}
                    useNameAsIs={true}
                    type="checkbox"
                    maxLength={100}
                    checked={selectedCellSettings()?.template.isRequired ?? false}
                    onChange={dispatchCellSettingsCheckbox}
                />
            </div>
            <SelectField
                name="inputHelper"
                label={"InputHelper"}
                useNameAsIs={true}
                value={selectedCellSettings()?.template.inputHelper ?? 1}
                onChange={dispatchCellSettings}
                options={[
                    ["0", "Test"],
                    ["1", "Fix Text"],
                    ["2", "Kurze Texteingabe"],
                    ["3", "Lange Texteingabe"],
                    ["4", "Zahleneingabe"],
                    ["5", "Checkbox"],
                    ["6", "Datum"],
                    ["7", "Zeit"],
                    ["8", "Datetime"],
                    ["9", "Farbe"],
                ]}
            />
            <InputField
                label={"Text"}
                name={"text"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={selectedCellSettings()?.template.text ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Description"}
                name={"description"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={selectedCellSettings()?.template.description ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputHelperSettings cell={selectedCellSettings()} />
        </fieldset>
    );
};

export default TemplateCellSettings;
