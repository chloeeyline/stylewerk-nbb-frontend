import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import Backend from "#/backend-routes";
import { DEFAULT_UUID } from "#/general";
import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import { IsRequiredFillfiled } from "~/redux/features/editor/editor-hook";
import { selectEditor, setEntry, updateEditor } from "~/redux/features/editor/editor-slice";
import { entryFoldersSchema } from "~/redux/features/entry/entry-schemas";
import { removeEntry } from "~/redux/features/entry/entry-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Ajax from "~/utils/ajax";
import cls from "~/utils/class-name-helper";
import InlineScroller from "~/components/layout/InlineScroller";

export default function EntrySettings({ isNew }: { isNew: boolean }) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [folders, setFolders] = useState<[string, string][]>();
    const navigate = useNavigate();

    useEffect(() => {
        Ajax.get(Backend.Entry.Folder.List, {
            auth: true,
        }).then((response) => {
            if (response.ok === false) return;
            const result = entryFoldersSchema.safeParse(response.result);
            if (result.success === false) return;
            const list: [string, string][] = result.data.map((f) => [
                f.id,
                f.id === DEFAULT_UUID ? t("editor.notInFolder") : f.name ?? "",
            ]);
            setFolders(list);
        });
    }, []);

    const dispatchGeneral = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        value: boolean | number | string | null,
    ) => {
        dispatch(
            setEntry({
                type: e.target.name,
                value: value,
            }),
        );
    };

    let allRequired = true;
    if (editor.data)
        outerFor: for (const row of editor.data.items) {
            for (const item of row.items) {
                allRequired = IsRequiredFillfiled(item, editor.isPreview, editor.isTemplate);
                if (allRequired === false) {
                    break outerFor;
                }
            }
        }

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
                            ? Routes.Entries.List
                            : Routes.Entries.View.replace(
                                  RouteParams.EntryId,
                                  editor.data.id,
                              ).replace(RouteParams.IsNew, "false")
                    }>
                    {t("common.back")}
                </NavLink>
                <button
                    className={cls("btn p-0", allRequired ? "btn-primary" : "btn-neutral")}
                    onClick={() => {
                        if (typeof editor.data?.id !== "string") return;
                        if (allRequired === true) dispatch(updateEditor());
                    }}>
                    {t("common.save")}
                </button>
                <button
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (editor.data === null || typeof editor.data.id !== "string") return;
                        dispatch(removeEntry({ id: editor.data.id }));
                        navigate(Routes.Entries.List);
                    }}>
                    {t("common.delete")}
                </button>
            </legend>
            <InlineScroller>
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    label={t("common.name")}
                    name="name"
                    type="text"
                    maxLength={100}
                    value={editor.data.name ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    label={t("formFields.tags")}
                    name="tags"
                    type="text"
                    maxLength={100}
                    value={editor.data.tags ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <SelectField
                    name="folderID"
                    label="Folder"
                    value={editor.data.folderID ?? 1}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                    options={folders ?? []}
                />
                <div className="d-grid" style={{ placeItems: "center" }}>
                    <InputField
                        label={t("formFields.public")}
                        name="isPublic"
                        type="checkbox"
                        maxLength={100}
                        checked={editor.data.isPublic}
                        onChange={(e) => dispatchGeneral(e, e.target.checked)}
                    />
                </div>
                <div className="d-grid" style={{ placeItems: "center" }}>
                    <InputField
                        label={"Encrypted"}
                        name="isEncrypted"
                        type="checkbox"
                        maxLength={100}
                        checked={editor.data.isEncrypted}
                        onChange={(e) => dispatchGeneral(e, e.target.checked)}
                    />
                </div>
            </InlineScroller>
        </fieldset>
    );
}
