import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import InlineScroller from "~/components/layout/InlineScroller";
import { selectEditor, setTemplate, updateEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import DeleteDialog from "./DeleteDialog";
import Copy from "~/components/Icon/Copy";
import Save from "~/components/Icon/Save";

export default function TemplateSettings({ isNew }: { isNew: boolean }) {
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
        <fieldset className="fieldset gap-1">
            <legend className="legend d-flex flex-wrap gap-0 rounded-2">
                <NavLink
                    className="btn btn-primary p-0"
                    to={
                        isNew === true
                            ? Routes.Templates.List
                            : Routes.Templates.View.replace(
                                  RouteParams.TemplateId,
                                  editor.data.templateID,
                              ).replace(RouteParams.IsNew, "false")
                    }>
                    {t("common.back")}
                </NavLink>
                <button
                    type="button"
                    className={cls(
                        "btn p-0",
                        typeof editor.data.template.name === "string" &&
                            editor.data.template.name.trim().length !== 0 &&
                            editor.error === null
                            ? "btn-primary"
                            : "btn-neutral",
                    )}
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        if (
                            typeof editor.data.template.name === "string" &&
                            editor.data.template.name.trim().length !== 0 &&
                            editor.error === null
                        )
                            dispatch(updateEditor());
                    }}>
                    <Save className="icon-inline m-ie-0" />
                    {t("common.save")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(copyTemplates({ id: editor.data?.templateID }));
                    }}>
                    <Copy className="icon-inline m-ie-0" />
                    {t("common.copy")}
                </button>
                {editor.data !== null && typeof editor.data.templateID === "string" ? (
                    <DeleteDialog
                        message={t("common.deleteWhat", { what: t("common.theTemplate") })}
                        onDelete={async () => {
                            if (
                                editor.data === null ||
                                typeof editor.data.templateID !== "string"
                            ) {
                                return { ok: false, error: "NoDataFound" };
                            }

                            const result = await dispatch(
                                removeTemplates({ id: editor.data?.templateID }),
                            );

                            if (
                                typeof result.payload === "object" &&
                                result.payload !== null &&
                                "status" in result.payload &&
                                result.payload.status === "succeeded"
                            ) {
                                return { ok: true, redirectTo: Routes.Templates.List };
                            }

                            if (
                                typeof result.payload === "object" &&
                                result.payload !== null &&
                                "name" in result.payload &&
                                result.payload.name === "NbbError" &&
                                "message" in result.payload &&
                                typeof result.payload.message === "string"
                            ) {
                                return { ok: false, error: result.payload.message };
                            }

                            return { ok: false, error: "NoDataFound" };
                        }}
                    />
                ) : null}
            </legend>
            <InlineScroller>
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    type="text"
                    label={t("common.name")}
                    name="name"
                    error={
                        editor.error !== null && editor.error === "NameMustBeUnique"
                            ? t("errorCodes.NameMustBeUnique")
                            : typeof editor.data.template.name !== "string" ||
                              editor.data.template.name.trim().length === 0
                            ? t("formErrors.pleaseEnter", {
                                  what: "Name",
                              })
                            : null
                    }
                    maxLength={100}
                    value={editor.data.template.name ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    type="text"
                    label={t("formFields.tags")}
                    name="tags"
                    maxLength={100}
                    value={editor.data.template.tags ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <InputField
                    style={{ minInlineSize: "30ch" }}
                    type="text"
                    label={t("formFields.description")}
                    name="description"
                    maxLength={100}
                    value={editor.data.template.description ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <div className="d-grid" style={{ placeItems: "center" }}>
                    <InputField
                        label={t("formFields.public")}
                        name="isPublic"
                        type="checkbox"
                        maxLength={100}
                        checked={editor.data.template.isPublic}
                        onChange={(e) => dispatchGeneral(e, e.target.checked)}
                    />
                </div>
            </InlineScroller>
        </fieldset>
    );
}
