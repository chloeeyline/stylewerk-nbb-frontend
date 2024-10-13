import { useTranslation } from "react-i18next";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import TemplateActions from "./TemplateActions";
import TemplateCellSettings from "./TemplateCellSettings";
import TemplateRowSettings from "./TemplateRowSettings";
import TemplateSettings from "./TemplateSettings";

const TemplateMenuBar = () => {
    const editor = useAppSelector(selectEditor);

    return (
        <div>
            {typeof editor.data?.templateID === "string" ? <TemplateActions /> : null}
            {editor.selectedTemplateRow.length > 0 ? <TemplateRowSettings /> : null}
            {editor.selectedTemplateCell.length > 0 ? <TemplateCellSettings /> : null}
            {typeof editor.data?.templateID === "string" ? <TemplateSettings /> : null}
        </div>
    );
};

export default TemplateMenuBar;
