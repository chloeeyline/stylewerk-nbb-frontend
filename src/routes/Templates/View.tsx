import { Link, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import { useEffect } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getEditor, selectEditor } from "~/redux/features/editor/editor-slice";

export default function TemplateView() {
    const { templateId } = useParams();
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!templateId) return;
        dispatch(getEditor({ id: templateId, isTemplate: true }));
    }, [templateId]);

    const { status, data } = editor;

    if (status === "idle") {
        return null;
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error...</div>;
    }

    return (
        <Grid layout="header" className="size-block-100">
            <ScrollContainer direction="both">
                <pre>
                    <code>{JSON.stringify(editor.data, undefined, 2)}</code>
                </pre>
                {typeof data?.templateID === "string" ? (
                    <>
                        <button
                            onClick={() => {
                                if (typeof data.templateID !== "string") return;
                                dispatch(copyTemplates({ id: data.templateID }));
                            }}>
                            Copy
                        </button>
                        <button
                            onClick={() => {
                                if (typeof data.templateID !== "string") return;
                                dispatch(removeTemplates({ id: data.templateID }));
                            }}>
                            Delete
                        </button>
                        <Link
                            to={Routes.Templates.Edit.replace(
                                RouteParams.TemplateId,
                                data.templateID,
                            )}>
                            Edit
                        </Link>
                    </>
                ) : null}
            </ScrollContainer>
        </Grid>
    );
}
