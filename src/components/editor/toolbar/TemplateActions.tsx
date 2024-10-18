import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import {
    selectEditor,
    updateEditor,
    addTemplateRow,
    addTemplateCell,
    removeTemplateRow,
    removeTemplateCell,
} from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const TemplateActions = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    return (
        <fieldset className="lrow">
            <legend>Allgemeine Actions</legend>
            <button
                className="m-1"
                onClick={() => {
                    if (typeof editor.data?.templateID !== "string") return;
                    dispatch(copyTemplates({ id: editor.data?.templateID }));
                }}>
                {t("common.copy")}
            </button>
            <button
                className="m-1"
                onClick={() => {
                    if (typeof editor.data?.templateID !== "string") return;
                    dispatch(removeTemplates({ id: editor.data?.templateID }));
                }}>
                {t("common.delete")}
            </button>
            <button
                className="m-1"
                onClick={() => {
                    if (typeof editor.data?.templateID !== "string") return;
                    dispatch(updateEditor());
                }}>
                {t("common.save")}
            </button>
            <button className="m-1" onClick={() => dispatch(addTemplateRow())}>
                neue Zelle hinzufügen
            </button>
            <button className="m-1" onClick={() => dispatch(addTemplateCell())}>
                neue Zelle zur Zeile hinzufügen
            </button>
            <button className="m-1" onClick={() => dispatch(removeTemplateRow())}>
                zeile löschen
            </button>
            <button className="m-1" onClick={() => dispatch(removeTemplateCell())}>
                Zelle löschen
            </button>
            <Link
                className="m-1"
                to={Routes.Templates.View.replace(
                    RouteParams.TemplateId,
                    editor.data?.templateID ?? "",
                )}>
                {t("common.back")}
            </Link>
        </fieldset>
    );
};

export default TemplateActions;
