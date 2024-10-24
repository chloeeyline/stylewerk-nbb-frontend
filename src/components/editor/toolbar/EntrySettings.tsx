import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Backend from "#/backend-routes";
import { DEFAULT_UUID } from "#/general";
import { useNavigate } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Routes from "~/constants/routes";
import { selectEditor, setEntry, updateEditor } from "~/redux/features/editor/editor-slice";
import { entryFoldersSchema } from "~/redux/features/entry/entry-schemas";
import { removeEntry } from "~/redux/features/entry/entry-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Ajax from "~/utils/ajax";

export default function EntrySettings() {
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
            console.log(result);
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

    if (editor.data === null) {
        return <div>{t("common.error")}</div>;
    }

    return (
        <fieldset className="lrow">
            <legend>
                <button
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.id !== "string") return;
                        dispatch(updateEditor());
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
            <InputField
                label={t("common.name")}
                name="name"
                type="text"
                maxLength={100}
                value={editor.data.name ?? ""}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
            />
            <InputField
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
            <div>
                <InputField
                    label={t("formFields.public")}
                    name="isPublic"
                    type="checkbox"
                    maxLength={100}
                    checked={editor.data.isPublic}
                    onChange={(e) => dispatchGeneral(e, e.target.checked)}
                />
                <InputField
                    label={"Encrypted"}
                    name="isEncrypted"
                    type="checkbox"
                    maxLength={100}
                    checked={editor.data.isEncrypted}
                    onChange={(e) => dispatchGeneral(e, e.target.checked)}
                />
            </div>
        </fieldset>
    );
}
