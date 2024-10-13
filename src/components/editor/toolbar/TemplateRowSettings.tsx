import { useTranslation } from "react-i18next";
import { selectEditor, setTemplateRow } from "~/redux/features/editor/editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const TemplateRowSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
            <div>
                <input
                    name="canWrapCells"
                    type="checkbox"
                    maxLength={100}
                    checked={selectedRowSettings()?.canWrapCells ?? false}
                    onChange={dispatchRowSettings}
                />
                <label htmlFor="canWrapCells">CanWrapCells</label>
            </div>
            <div>
                <input
                    name="canRepeat"
                    type="checkbox"
                    maxLength={100}
                    checked={selectedRowSettings()?.canRepeat ?? false}
                    onChange={dispatchRowSettings}
                />
                <label htmlFor="canRepeat">CanRepeat</label>
            </div>
            <div>
                <input
                    name="hideOnNoInput"
                    type="checkbox"
                    maxLength={100}
                    checked={selectedRowSettings()?.hideOnNoInput ?? false}
                    onChange={dispatchRowSettings}
                />
                <label htmlFor="hideOnNoInput">HideOnNoInput</label>
            </div>
        </fieldset>
    );
};

export default TemplateRowSettings;
