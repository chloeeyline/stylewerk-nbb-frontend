import { useEffect, useRef } from "react";
import InputField from "~/components/forms/InputField";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelperSettings from "./InputHelperSettings";
import SelectField from "~/components/forms/SelectField";

const TemplateCellSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const selectRef = useRef<HTMLSelectElement>(null);

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

    const handleWheelEvent = (e: WheelEvent) => {
        if (selectRef.current) {
            e.preventDefault();
            const selectElement = selectRef.current;
            const currentIndex = selectElement.selectedIndex;

            if (e.deltaY < 0 && currentIndex > 0) selectElement.selectedIndex = currentIndex - 1;
            else if (e.deltaY > 0 && currentIndex < selectElement.options.length - 1)
                selectElement.selectedIndex = currentIndex + 1;

            const event = new Event("change", { bubbles: true });
            selectElement.dispatchEvent(event);
        }
    };

    useEffect(() => {
        const selectElement = selectRef.current;
        if (selectElement) selectElement.addEventListener("wheel", handleWheelEvent);
        return () => {
            if (selectElement) selectElement.removeEventListener("wheel", handleWheelEvent);
        };
    }, []);

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
                value={selectedCellSettings()?.template.inputHelper ?? 1}
                onChange={dispatchCellSettings}
                ref={selectRef}
                error={null}
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
