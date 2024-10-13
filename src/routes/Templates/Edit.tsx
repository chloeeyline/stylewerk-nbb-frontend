import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EditorRow from "~/components/editor/EditorRow";
import TemplateGeneral from "~/components/editor/TemplateGeneral";
import TemplateMenuBar from "~/components/editor/TemplateMenuBar";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { DEFAULT_UUID } from "~/constants/general";
import { CreateEditor } from "~/redux/features/editor/editor-create";
import { getEditor, reset, selectEditor, setEditor } from "~/redux/features/editor/editor-slice";
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
