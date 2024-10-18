import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import {
    addTemplateRow,
    selectEditor,
    setTemplate,
    updateEditor,
} from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const TemplateSettings = () => {
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
        <fieldset className="lrow">
            <legend className="d-flex gap-2">
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(updateEditor());
                    }}>
                    {t("common.save")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(copyTemplates({ id: editor.data?.templateID }));
                    }}>
                    {t("common.copy")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(removeTemplates({ id: editor.data?.templateID }));
                    }}>
                    {t("common.delete")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => dispatch(addTemplateRow())}>
                    neue Zelle hinzufügen
                </button>
            </legend>
            <InputField
                label={t("common.name")}
                name={"name"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.template.name ?? ""}
                onChange={dispatchGeneral}
            />
            <InputField
                label={t("formFields.description")}
                name={"description"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.template.description ?? ""}
                onChange={dispatchGeneral}
            />
            <InputField
                label={t("formFields.tags")}
                name={"tags"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.template.tags ?? ""}
                onChange={dispatchGeneral}
            />
        </fieldset>
    );
};

export default TemplateSettings;
