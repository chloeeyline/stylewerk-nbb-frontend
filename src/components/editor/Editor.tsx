import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_UUID } from "~/constants/general";
import { CreateEditor } from "~/redux/features/editor/editor-create";
import {
    getEditor,
    reset,
    selectEditor,
    setEditor,
    setMode,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Grid from "../layout/Grid";
import ScrollContainer from "../layout/ScrollContainer";
import EditorRow from "./EditorRow";
import TemplateActions from "./toolbar/TemplateActions";
import TemplateCellSettings from "./toolbar/TemplateCellSettings";
import TemplateRowSettings from "./toolbar/TemplateRowSettings";
import TemplateSettings from "./toolbar/TemplateSettings";

const Editor = ({
    id,
    isTemplate,
    isPreview,
}: {
    id: string;
    isTemplate: boolean;
    isPreview: boolean;
}) => {
    const editor = useAppSelector(selectEditor);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setMode({ isTemplate: isTemplate, isPreview: isPreview }));
        if (isTemplate && id == DEFAULT_UUID) {
            dispatch(setEditor(CreateEditor()));
            return;
        }
        dispatch(getEditor({ id: id, isTemplate: isTemplate }));
        return () => {
            dispatch(reset());
        };
    }, [id]);

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
            <div>
                {editor.isTemplate === true && editor.isPreview === false ? (
                    <TemplateActions />
                ) : null}
                {editor.isTemplate === true &&
                editor.isPreview === false &&
                editor.selectedTemplateRow.length > 0 ? (
                    <TemplateRowSettings />
                ) : null}
                {editor.isTemplate === true &&
                editor.isPreview === false &&
                editor.selectedTemplateCell.length > 0 ? (
                    <TemplateCellSettings />
                ) : null}
                {editor.isTemplate === true && editor.isPreview === false ? (
                    <TemplateSettings />
                ) : null}
            </div>
            <ScrollContainer direction="both">
                <form className="lcontainer">
                    <fieldset>
                        <legend>Editor</legend>
                        {editor.data.items.map((row) =>
                            editor.isTemplate ? (
                                <EditorRow key={row.templateID} row={row} />
                            ) : (
                                <EditorRow key={row.id} row={row} />
                            ),
                        )}
                    </fieldset>
                </form>
            </ScrollContainer>
        </Grid>
    );
};

export default Editor;
