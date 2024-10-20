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
        ) {
            return null;
        }

        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        if (!row) return null;
        const cell = row?.items.find((cell) => cell.templateID === editor.selectedTemplateCell);
        return cell ?? null;
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
            <legend className="legend">Zelle</legend>
            <div className="d-flex flex-wrap gap-1">
                <SelectField
                    name="inputHelper"
                    label="InputHelper"
                    useNameAsIs={true}
                    value={selectedCellSettings()?.template.inputHelper ?? 1}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                    options={[
                        ["0", "Test"],
                        ["1", "Fix Text"],
                        ["3", "Texteingabe"],
                        ["4", "Zahleneingabe"],
                        ["5", "Checkbox"],
                        ["6", "Datetime"],
                        ["7", "Farbe"],
                    ]}
                />
                <InputField
                    label="Text"
                    name="text"
                    useNameAsIs={true}
                    type="text"
                    maxLength={100}
                    value={selectedCellSettings()?.template.text ?? ""}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                />
                <InputField
                    label="Description"
                    name="description"
                    useNameAsIs={true}
                    type="text"
                    maxLength={100}
                    value={selectedCellSettings()?.template.description ?? ""}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                />
                <InputHelperSettings cell={selectedCellSettings()} />
            </div>
        </fieldset>
    );
};

export default TemplateCellSettings;
