import RouteParams from "#/route-params";
import Routes from "#/routes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { DEFAULT_UUID } from "~/constants/general";
import { CreateEditor } from "~/redux/features/editor/editor-create";
import { Editor, EntryCell, EntryRow } from "~/redux/features/editor/editor-schemas";
import {
    addTemplateCell,
    addTemplateRow,
    getEditor,
    removeTemplateCell,
    removeTemplateRow,
    reset,
    selectEditor,
    setEditor,
    setSelected,
    setTemplate,
    setTemplateCell,
    setTemplateRow,
    updateEditor,
} from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function TemplatesEdit() {
    const { templateId } = useParams();
    const editor = useAppSelector(selectEditor);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!templateId || templateId == DEFAULT_UUID) {
            dispatch(setEditor(CreateEditor()));
            return;
        }
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
        return row?.template;
    };
    const selectedCellSettings = () => {
        if (
            editor.selectedTemplateRow.length == 0 ||
            editor.selectedTemplateCell.length == 0 ||
            editor.data === null
        )
            return null;
        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        if (!row) return null;
        const cell = row?.items.find((cell) => cell.templateID === editor.selectedTemplateCell);
        return cell?.template;
    };

    const dispatchRowSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateRow({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
    };

    const dispatchCellSettingsCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
    };

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: e.target.value,
            }),
        );
    };

    return (
        <div>
            {typeof editor.data?.templateID === "string" ? (
                <fieldset className="lrow">
                    <legend>Allgemeine Actions</legend>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(copyTemplates({ id: editor.data?.templateID }));
                        }}>
                        {t("common.copy")}
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(removeTemplates({ id: editor.data?.templateID }));
                        }}>
                        {t("common.delete")}
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(updateEditor({ isTemplate: true }));
                        }}>
                        {t("common.save")}
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(addTemplateRow())}>
                        neue Zelle hinzufügen
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(addTemplateCell())}>
                        neue Zelle zur Zeile hinzufügen
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(removeTemplateRow())}>
                        zeile löschen
                    </button>
                    <button
                        className="lcell margin"
                        style={{ "--margin": "0 0.5rem 0 0" }}
                        onClick={() => dispatch(removeTemplateCell())}>
                        Zelle löschen
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
                    <legend>Zeilen Einstellung</legend>
                    <>
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
                    </>
                </fieldset>
            ) : null}
            {editor.selectedTemplateCell.length > 0 ? (
                <fieldset className="lrow">
                    <legend>Zellen Einstellung</legend>
                    <div>
                        <input
                            name="hideOnEmpty"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedCellSettings()?.hideOnEmpty}
                            onChange={dispatchCellSettingsCheckbox}
                        />
                        <label htmlFor="hideOnEmpty">hideOnEmpty</label>
                    </div>
                    <div>
                        <input
                            name="isRequired"
                            type="checkbox"
                            maxLength={100}
                            checked={selectedCellSettings()?.isRequired}
                            onChange={dispatchCellSettingsCheckbox}
                        />
                        <label htmlFor="isRequired">isRequired</label>
                    </div>
                    <div>
                        <input
                            name="inputHelper"
                            type="number"
                            maxLength={100}
                            value={selectedCellSettings()?.inputHelper}
                            onChange={dispatchCellSettings}
                        />
                        <label htmlFor="inputHelper">inputHelper</label>
                    </div>
                    <div>
                        <input
                            name="text"
                            type="text"
                            maxLength={100}
                            value={selectedCellSettings()?.text ?? ""}
                            onChange={dispatchCellSettings}
                        />
                        <label htmlFor="text">text</label>
                    </div>
                    <div>
                        <input
                            name="description"
                            type="text"
                            maxLength={100}
                            value={selectedCellSettings()?.description ?? ""}
                            onChange={dispatchCellSettings}
                        />
                        <label htmlFor="description">description</label>
                    </div>
                </fieldset>
            ) : null}
        </div>
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
                    isReadOnly={true}
                />
            ))}
        </div>
    );
};

const EditorCell = ({
    cell,
    entryRowID,
    templateRowID,
    isReadOnly,
}: {
    cell: EntryCell;
    entryRowID: string;
    templateRowID: string;
    isReadOnly: boolean;
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
            case 1:
                return <IhStatic cell={cell} isReadOnly={isReadOnly} />;
            case 2:
                return <IhTextShort cell={cell} isReadOnly={isReadOnly} />;
            case 3:
                return <IhTextLong cell={cell} isReadOnly={isReadOnly} />;
            case 4:
                return <IhNumber cell={cell} isReadOnly={isReadOnly} />;
            case 5:
                return <IhCheckbox cell={cell} isReadOnly={isReadOnly} />;
            case 6:
                return <IhDate cell={cell} isReadOnly={isReadOnly} />;
            case 7:
                return <IhTime cell={cell} isReadOnly={isReadOnly} />;
            case 8:
                return <IhDateTime cell={cell} isReadOnly={isReadOnly} />;
            default:
                return (
                    <pre>
                        <code>{JSON.stringify(cell.template, undefined, 2)}</code>
                    </pre>
                );
        }
    };

    return (
        <div
            onClick={select}
            style={{
                backgroundColor: cell.templateID == editor.selectedTemplateCell ? "blue" : "",
                padding: "0.5rem",
            }}
            className="lcell"
            title={cell.template?.description ?? ""}>
            {getInputHelper()}
        </div>
    );
};

const IhStatic = ({ cell }: { cell: EntryCell; isReadOnly: boolean }) => {
    return <div>{cell.template.text ?? cell.template.text ?? ""}</div>;
};

const IhTextShort = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <input
            type="text"
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};

const IhTextLong = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <textarea
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};

const IhNumber = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <input
            type="number"
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};

const IhCheckbox = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <input
            type="checkbox"
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};

const IhDate = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <input
            type="date"
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};

const IhTime = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <input
            type="time"
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};

const IhDateTime = ({ cell, isReadOnly }: { cell: EntryCell; isReadOnly: boolean }) => {
    return (
        <input
            type="datetime"
            placeholder={cell.template.text ?? ""}
            disabled={isReadOnly}
            required={cell.template.isRequired}
            onChange={() => {}}
        />
    );
};
