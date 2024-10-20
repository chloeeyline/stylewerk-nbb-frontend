import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import { selectEditor, setTemplate, updateEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const TemplateSettings = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const dispatchGeneral = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        value: boolean | number | string,
    ) => {
        dispatch(
            setTemplate({
                type: e.target.name,
                value: value,
            }),
        );
    };

    if (editor.data === null) {
        return <div>{t("common.error")}</div>;
    }

    return (
        <fieldset className="fieldset d-flex flex-wrap gap-1">
            <legend className="legend d-flex gap-0 rounded-2">
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
                {/* <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => dispatch(addTemplateRow())}>
                    neue Zelle hinzufügen
                </button> */}
            </legend>
            <InputField
                label={t("common.name")}
                name="name"
                type="text"
                maxLength={100}
                value={editor.data.template.name ?? ""}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
            />
            <InputField
                label={t("formFields.description")}
                name="description"
                type="text"
                maxLength={100}
                value={editor.data.template.description ?? ""}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
            />
            <InputField
                className="input"
                label={t("formFields.tags")}
                name="tags"
                type="text"
                maxLength={100}
                value={editor.data.template.tags ?? ""}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
            />
            <InputField
                label={t("formFields.public")}
                name={"isPublic"}
                useNameAsIs={true}
                type="checkbox"
                maxLength={100}
                checked={editor.data.template.isPublic}
                onChange={(e) => dispatchGeneral(e, e.target.checked)}
            />
        </fieldset>
    );
};

export default TemplateSettings;
