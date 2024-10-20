import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import InlineScroller from "~/components/layout/InlineScroller";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelperSettings from "./InputHelperSettings";

export default function TemplateCellSettings() {
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
            <InlineScroller>
                <SelectField
                    style={{ minInlineSize: "10ch" }}
                    name="inputHelper"
                    label="InputHelper"
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
                    style={{ minInlineSize: "10ch" }}
                    type="text"
                    label="Text"
                    name="text"
                    maxLength={100}
                    value={selectedCellSettings()?.template.text ?? ""}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                />
                <InputField
                    style={{ minInlineSize: "30ch" }}
                    type="text"
                    label="Description"
                    name="description"
                    maxLength={100}
                    value={selectedCellSettings()?.template.description ?? ""}
                    onChange={(e) => dispatchCellSettings(e, e.target.value)}
                />
                <div className="d-grid gap-1" style={{ placeItems: "center" }}>
                    <InputField
                        type="checkbox"
                        label="HideOnEmpty"
                        name="hideOnEmpty"
                        useNameAsIs={true}
                        maxLength={100}
                        checked={selectedCellSettings()?.template.hideOnEmpty ?? false}
                        onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                    />
                    <InputField
                        type="checkbox"
                        label="IsRequired"
                        name="isRequired"
                        useNameAsIs={true}
                        maxLength={100}
                        checked={selectedCellSettings()?.template.isRequired ?? false}
                        onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                    />
                </div>
                <InputHelperSettings cell={selectedCellSettings()} />
            </InlineScroller>
        </fieldset>
    );
}
