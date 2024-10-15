import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Backend from "~/constants/backend-routes";
import { selectEditor, setEntry, updateEditor } from "~/redux/features/editor/editor-slice";
import { entryFoldersSchema } from "~/redux/features/entry/entry-schemas";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Ajax from "~/utils/ajax";

const EntrySettings = () => {
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
            var list = result.data.map((f) => [f.id, f.name ?? ""]);
            // setFolders(list);
        });
    });

    const dispatchGeneral = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch(
            setEntry({
                type: e.target.name,
                value: e.target.value,
            }),
        );
    };

    const dispatchGeneralCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setEntry({
                type: e.target.name,
                value: e.target.checked ? "true" : "false",
            }),
        );
    };

    if (editor.data === null) {
        return <div>{t("common.error")}</div>;
    }

    return (
        <fieldset className="lrow">
            <legend>Allgemein</legend>
            <InputField
                label={t("common.name")}
                name={"name"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.name ?? ""}
                onChange={dispatchGeneral}
            />
            <InputField
                label={t("formFields.tags")}
                name={"tags"}
                useNameAsIs={true}
                type="text"
                maxLength={100}
                value={editor.data.tags ?? ""}
                onChange={dispatchGeneral}
            />
            <SelectField
                name="folderID"
                label={"Folder"}
                useNameAsIs={true}
                value={editor.data.folderID ?? 1}
                onChange={dispatchGeneral}
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
                    onChange={dispatchGeneralCheckbox}
                />
                <InputField
                    label={"Encrypted"}
                    name={"isEncrypted"}
                    useNameAsIs={true}
                    type="checkbox"
                    maxLength={100}
                    checked={editor.data.isEncrypted}
                    onChange={dispatchGeneralCheckbox}
                />
            </div>
            <button
                className="m-1"
                onClick={() => {
                    if (typeof editor.data?.id !== "string") return;
                    dispatch(updateEditor());
                }}>
                {t("common.save")}
            </button>
        </fieldset>
    );
};

export default EntrySettings;
