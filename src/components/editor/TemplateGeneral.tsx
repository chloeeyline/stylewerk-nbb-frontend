import { useTranslation } from "react-i18next";
import { selectEditor, setTemplate } from "~/redux/features/editor/editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const TemplateGeneral = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const dispatchGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplate({
                type: e.target.name,
                value: e.target.value,
            }),
        );
    };

    if (editor.data === null) {
        return <div>{t("common.error")}</div>;
    }

    return (
        <fieldset>
            <legend>Allgemein</legend>
            <label htmlFor="name">{t("common.name")}</label>
            <input
                name="name"
                type="text"
                maxLength={100}
                value={editor.data.template.name ?? ""}
                onChange={dispatchGeneral}
            />
            <label htmlFor="description">{t("formFields.description")}</label>
            <input
                name="description"
                type="text"
                value={editor.data.template.description ?? ""}
                onChange={dispatchGeneral}
            />
            <label htmlFor="tags">{t("formFields.tags")}</label>
            <input
                name="tags"
                type="text"
                value={editor.data.template.tags ?? ""}
                onChange={dispatchGeneral}
            />
        </fieldset>
    );
};

export default TemplateGeneral;
