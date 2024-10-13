import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import InputHelperSettings from "./InputHelperSettings";

const TemplateCellSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
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
                <input
                    name="hideOnEmpty"
                    type="checkbox"
                    maxLength={100}
                    checked={selectedCellSettings()?.template.hideOnEmpty ?? false}
                    onChange={dispatchCellSettingsCheckbox}
                />
                <label htmlFor="hideOnEmpty">hideOnEmpty</label>
            </div>
            <div>
                <input
                    name="isRequired"
                    type="checkbox"
                    maxLength={100}
                    checked={selectedCellSettings()?.template.isRequired ?? false}
                    onChange={dispatchCellSettingsCheckbox}
                />
                <label htmlFor="isRequired">isRequired</label>
            </div>
            <div>
                <select
                    name="inputHelper"
                    value={selectedCellSettings()?.template.inputHelper ?? 1}
                    onChange={dispatchCellSettings}
                    ref={selectRef}>
                    <option value="1">Fix Text</option>
                    <option value="2">Kurze Texteingabe</option>
                    <option value="3">Lange Texteingabe</option>
                    <option value="4">Zahleneingabe</option>
                    <option value="5">Checkbox</option>
                    <option value="6">Datum</option>
                    <option value="7">Zeit</option>
                    <option value="8">Datetime</option>
                    <option value="9">Farbe</option>
                </select>
                <label htmlFor="inputHelper">inputHelper</label>
            </div>
            <div>
                <input
                    name="text"
                    type="text"
                    maxLength={100}
                    value={selectedCellSettings()?.template.text ?? ""}
                    onChange={dispatchCellSettings}
                />
                <label htmlFor="text">text</label>
            </div>
            <div>
                <input
                    name="description"
                    type="text"
                    maxLength={100}
                    value={selectedCellSettings()?.template.description ?? ""}
                    onChange={dispatchCellSettings}
                />
                <label htmlFor="description">description</label>
            </div>
            <InputHelperSettings cell={selectedCellSettings()} />
        </fieldset>
    );
};

export default TemplateCellSettings;
