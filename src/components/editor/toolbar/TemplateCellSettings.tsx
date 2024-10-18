import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import {
    selectEditor,
    setTemplateCell,
    setTemplateRow,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelperSettings from "./InputHelperSettings";

const TemplateCellSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const selectedRowSettings = () => {
        if (editor.selectedTemplateRow.length == 0 || editor.data === null) return null;
        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        return row?.template;
    };

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

    const dispatchRowSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateRow({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
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
        <fieldset className="lrow">
            <legend>Einstellungen</legend>
            <fieldset className="lcell">
                <legend>Zeile</legend>
                <InputField
                    label={"CanWrapCells"}
                    name={"canWrapCells"}
                    useNameAsIs={true}
                    type="checkbox"
                    checked={selectedRowSettings()?.canWrapCells ?? false}
                    onChange={dispatchRowSettings}
                />
                <InputField
                    label={"CanRepeat"}
                    name={"canRepeat"}
                    useNameAsIs={true}
                    type="checkbox"
                    checked={selectedRowSettings()?.canRepeat ?? false}
                    onChange={dispatchRowSettings}
                />
                <InputField
                    label={"HideOnNoInput"}
                    name={"hideOnNoInput"}
                    useNameAsIs={true}
                    type="checkbox"
                    checked={selectedRowSettings()?.hideOnNoInput ?? false}
                    onChange={dispatchRowSettings}
                />
            </fieldset>
            <fieldset className="lcell">
                <legend>Zelle</legend>
                <div className="lrow">
                    <div>
                        <InputField
                            label={"HideOnEmpty"}
                            name={"hideOnEmpty"}
                            useNameAsIs={true}
                            type="checkbox"
                            maxLength={100}
                            checked={selectedCellSettings()?.template.hideOnEmpty ?? false}
                            onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                        />
                        <InputField
                            label={"IsRequired"}
                            name={"isRequired"}
                            useNameAsIs={true}
                            type="checkbox"
                            maxLength={100}
                            checked={selectedCellSettings()?.template.isRequired ?? false}
                            onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                        />
                    </div>
                    <SelectField
                        name="inputHelper"
                        label={"InputHelper"}
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
                        label={"Text"}
                        name={"text"}
                        useNameAsIs={true}
                        type="text"
                        maxLength={100}
                        value={selectedCellSettings()?.template.text ?? ""}
                        onChange={(e) => dispatchCellSettings(e, e.target.value)}
                    />
                    <InputField
                        label={"Description"}
                        name={"description"}
                        useNameAsIs={true}
                        type="text"
                        maxLength={100}
                        value={selectedCellSettings()?.template.description ?? ""}
                        onChange={(e) => dispatchCellSettings(e, e.target.value)}
                    />
                    <InputHelperSettings cell={selectedCellSettings()} />
                </div>
            </fieldset>
        </fieldset>
    );
};

export default TemplateCellSettings;
