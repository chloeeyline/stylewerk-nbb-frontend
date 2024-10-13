import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import {
    selectEditor,
    setTemplateRow,
    setTemplateCell,
    updateEditor,
    addTemplateRow,
    addTemplateCell,
    removeTemplateRow,
    removeTemplateCell,
} from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const TemplateMenuBar = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const selectRef = useRef<HTMLSelectElement>(null);

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
        return cell?.template;
    };

    const dispatchRowSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateRow({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
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
        if (e.target.name === "inputHelper") {
            dispatch(
                setTemplateCell({
                    type: e.target.name,
                    value: Number(e.target.value),
                }),
            );
            return;
        }

        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: e.target.value,
            }),
        );
    };

    const handleWheelEvent = (e: WheelEvent) => {
        if (selectRef.current) {
            e.preventDefault(); // Prevent page scroll
            const selectElement = selectRef.current;
            const currentIndex = selectElement.selectedIndex;

            if (e.deltaY < 0 && currentIndex > 0) {
                // Scroll up, select previous option
                selectElement.selectedIndex = currentIndex - 1;
            } else if (e.deltaY > 0 && currentIndex < selectElement.options.length - 1) {
                // Scroll down, select next option
                selectElement.selectedIndex = currentIndex + 1;
            }

            // Trigger the onChange event programmatically
            const event = new Event("change", { bubbles: true });
            selectElement.dispatchEvent(event);
        }
    };

    useEffect(() => {
        const selectElement = selectRef.current;

        if (selectElement) {
            selectElement.addEventListener("wheel", handleWheelEvent);
        }

        return () => {
            if (selectElement) {
                selectElement.removeEventListener("wheel", handleWheelEvent);
            }
        };
    }, []);

    return (
        <div>
            {typeof editor.data?.templateID === "string" ? (
                <fieldset className="lrow">
                    <legend>Allgemeine Actions</legend>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(copyTemplates({ id: editor.data?.templateID }));
                        }}>
                        {t("common.copy")}
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(removeTemplates({ id: editor.data?.templateID }));
                        }}>
                        {t("common.delete")}
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(updateEditor({ isTemplate: true }));
                        }}>
                        {t("common.save")}
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(addTemplateRow())}>
                        neue Zelle hinzufügen
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(addTemplateCell())}>
                        neue Zelle zur Zeile hinzufügen
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(removeTemplateRow())}>
                        zeile löschen
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(removeTemplateCell())}>
                        Zelle löschen
                    </button>
                    <Link
                        className="lcell"
                        to={Routes.Templates.View.replace(
                            RouteParams.TemplateId,
                            editor.data?.templateID,
                        )}>
                        {t("common.back")}
                    </Link>
                </fieldset>
            ) : null}
            {editor.selectedTemplateRow.length > 0 ? (
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
            ) : null}
            {editor.selectedTemplateCell.length > 0 ? (
                <fieldset className="lrow">
                    <legend>Zellen Einstellung</legend>
                    <div>
                        <input
                            name="hideOnEmpty"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedCellSettings()?.hideOnEmpty ?? false}
                            onChange={dispatchCellSettingsCheckbox}
                        />
                        <label htmlFor="hideOnEmpty">hideOnEmpty</label>
                    </div>
                    <div>
                        <input
                            name="isRequired"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedCellSettings()?.isRequired ?? false}
                            onChange={dispatchCellSettingsCheckbox}
                        />
                        <label htmlFor="isRequired">isRequired</label>
                    </div>
                    <div>
                        <select
                            name="inputHelper"
                            value={selectedCellSettings()?.inputHelper ?? 1}
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
                            value={selectedCellSettings()?.text ?? ""}
                            onChange={dispatchCellSettings}
                        />
                        <label htmlFor="text">text</label>
                    </div>
                    <div>
                        <input
                            name="description"
                            type="text"
                            maxLength={100}
                            value={selectedCellSettings()?.description ?? ""}
                            onChange={dispatchCellSettings}
                        />
                        <label htmlFor="description">description</label>
                    </div>
                </fieldset>
            ) : null}
        </div>
    );
};

export default TemplateMenuBar;
