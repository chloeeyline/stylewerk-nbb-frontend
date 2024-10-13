import InputField from "~/components/forms/InputField";
import { selectEditor, setTemplateRow } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const TemplateRowSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const selectedRowSettings = () => {
        if (editor.selectedTemplateRow.length == 0 || editor.data === null) return null;
        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        return row?.template;
    };

    const dispatchRowSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateRow({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
    };

    return (
        <fieldset className="lrow">
            <legend>Zeilen Einstellung</legend>
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
    );
};

export default TemplateRowSettings;
