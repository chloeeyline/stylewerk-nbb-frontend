import { Link, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import { useEffect } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import {
    addTemplateRow,
    getEditor,
    reset,
    selectEditor,
    setSelected,
    setTemplate,
    setTemplateRow,
    updateEditor,
} from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { useTranslation } from "react-i18next";
import { EntryCell, EntryRow, Template } from "~/redux/features/editor/editor-schemas";

export default function TemplatesEdit() {
    const { templateId } = useParams();
    const editor = useAppSelector(selectEditor);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!templateId) return;
        dispatch(getEditor({ id: templateId, isTemplate: true }));
        return () => {
            dispatch(reset());
        };
    }, [templateId]);

    if (editor.status === "idle") {
        return null;
    }

    if (editor.status === "loading") {
        return <div>{t("common.loading")}</div>;
    }

    if (editor.status === "failed" || editor.data === null) {
        return <div>{t("common.error")}</div>;
    }

    return (
        <Grid layout="header" className="size-block-100">
            <TemplateMenuBar />
            <ScrollContainer direction="both">
                <form className="lcontainer">
                    <TemplateGeneral />
                    <fieldset>
                        <legend>Editor</legend>
                        {editor.data.items.map((row) => (
                            <EditorRow key={row.templateID} row={row} />
                        ))}
                    </fieldset>
                </form>
            </ScrollContainer>
        </Grid>
    );
}

const TemplateMenuBar = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const selectedRowSettings = () => {
        if (editor.selectedTemplateRow.length == 0 || editor.data === null) return null;
        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        console.log(row);
        return row?.template;
    };

    const dispatchRowSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateRow({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
    };

    return (
        <>
            {typeof editor.data?.templateID === "string" ? (
                <fieldset className="lrow">
                    <legend>Allgemeine Actions</legend>
                    <button
                        className="lcell"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(copyTemplates({ id: editor.data?.templateID }));
                        }}>
                        {t("common.copy")}
                    </button>
                    <button
                        className="lcell"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(removeTemplates({ id: editor.data?.templateID }));
                        }}>
                        {t("common.delete")}
                    </button>
                    <button
                        className="lcell"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(updateEditor({ isTemplate: true }));
                        }}>
                        {t("common.save")}
                    </button>
                    <Link
                        className="lcell"
                        to={Routes.Templates.View.replace(
                            RouteParams.TemplateId,
                            editor.data?.templateID,
                        )}>
                        {t("common.back")}
                    </Link>
                </fieldset>
            ) : null}
            {editor.selectedTemplateRow.length > 0 ? (
                <fieldset className="lrow">
                    <legend>Zeilen Actions</legend>
                    <div>
                        <input
                            name="canWrapCells"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedRowSettings()?.canWrapCells}
                            onChange={dispatchRowSettings}
                        />
                        <label htmlFor="canWrapCells">CanWrapCells</label>
                    </div>
                    <div>
                        <input
                            name="canRepeat"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedRowSettings()?.canRepeat}
                            onChange={dispatchRowSettings}
                        />
                        <label htmlFor="canRepeat">CanRepeat</label>
                    </div>
                    <div>
                        <input
                            name="hideOnNoInput"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedRowSettings()?.hideOnNoInput}
                            onChange={dispatchRowSettings}
                        />
                        <label htmlFor="hideOnNoInput">HideOnNoInput</label>
                    </div>
                    <button onClick={() => dispatch(addTemplateRow())}>
                        neue Zelle zur Zeile hinzufügen
                    </button>
                    <button onClick={() => dispatch(addTemplateRow())}>zeile löschen</button>
                </fieldset>
            ) : null}
            {editor.selectedTemplateCell.length > 0 ? (
                <fieldset className="lrow">
                    <legend>Zellen Actions</legend>
                    <button className="lcell">{t("common.copy")}</button>
                </fieldset>
            ) : null}
        </>
    );
};

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

const EditorRow = ({ row }: { row: EntryRow }) => {
    const editor = useAppSelector(selectEditor);
    return (
        <div
            className="lrow"
            style={{
                backgroundColor: row.templateID == editor.selectedTemplateRow ? "green" : "red",
                margin: "0.5rem",
            }}>
            {row.items.map((cell) => (
                <EditorCell
                    key={cell.templateID}
                    cell={cell}
                    entryRowID={row.id}
                    templateRowID={row.templateID}
                />
            ))}
        </div>
    );
};

const EditorCell = ({
    cell,
    entryRowID,
    templateRowID,
}: {
    cell: EntryCell;
    entryRowID: string;
    templateRowID: string;
}) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const select = () => {
        dispatch(
            setSelected({
                entryRow: entryRowID,
                entryCell: cell.id,
                templateRow: templateRowID,
                templateCell: cell.templateID,
            }),
        );
    };

    const getInputHelper = () => {
        switch (cell.template.inputHelper) {
            case 2:
                return <IhStatic cell={cell} />;
            default:
                return (
                    <pre>
                        <code>{JSON.stringify(cell, undefined, 2)}</code>
                    </pre>
                );
        }
    };

    return (
        <div
            onClick={select}
            style={{
                backgroundColor: cell.templateID == editor.selectedTemplateCell ? "blue" : "",
            }}
            className="lcell"
            title={cell.template?.description ?? ""}>
            {getInputHelper()}
        </div>
    );
};

const IhStatic = ({ cell }: { cell: EntryCell }) => {
    const editor = useAppSelector(selectEditor);
    return <>{editor.isTemplate ? <input /> : cell.template.text ?? cell.template.text ?? ""}</>;
};
