import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Backend from "#/backend-routes";
import { selectEditor, setEntry, updateEditor } from "~/redux/features/editor/editor-slice";
import { entryFoldersSchema } from "~/redux/features/entry/entry-schemas";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Ajax from "~/utils/ajax";

export default function EntrySettings() {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [folders, setFolders] = useState<[string, string][]>();

    useEffect(() => {
        Ajax.get(Backend.Entry.Folder.List, {
            auth: true,
        }).then((response) => {
            if (response.ok === false) return;
            var result = entryFoldersSchema.safeParse(response.result);
            if (result.success === false) return;
            const list: [string, string][] = result.data.map(
                (f) => [f.id, f.name ?? ""] as [string, string],
            );
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
            </legend>
            <InputField
                label={t("common.name")}
                name={"name"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.name ?? ""}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
            />
            <InputField
                label={t("formFields.tags")}
                name={"tags"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.tags ?? ""}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
            />
            <SelectField
                name="folderID"
                label={"Folder"}
                useNameAsIs={true}
                value={editor.data.folderID ?? 1}
                onChange={(e) => dispatchGeneral(e, e.target.value)}
                options={folders ?? []}
            />
            <div>
                <InputField
                    label={t("formFields.public")}
                    name={"isPublic"}
                    useNameAsIs={true}
                    type="checkbox"
                    maxLength={100}
                    checked={editor.data.isPublic}
                    onChange={(e) => dispatchGeneral(e, e.target.checked)}
                />
                <InputField
                    label={"Encrypted"}
                    name={"isEncrypted"}
                    useNameAsIs={true}
                    type="checkbox"
                    maxLength={100}
                    checked={editor.data.isEncrypted}
                    onChange={(e) => dispatchGeneral(e, e.target.checked)}
                />
            </div>
        </fieldset>
    );
}
