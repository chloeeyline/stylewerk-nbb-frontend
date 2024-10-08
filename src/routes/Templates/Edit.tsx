import { Link, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import { useEffect } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { getEditor, reset, selectEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function TemplatesEdit() {
    const { templateId } = useParams();
    const editor = useAppSelector(selectEditor);
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
        return <div>Loading...</div>;
    }

    if (editor.status === "failed") {
        return <div>Error...</div>;
    }

    return (
        <Grid layout="headerFooter" className="size-block-100">
            <ScrollContainer direction="both">
                <pre>
                    <code>{JSON.stringify(editor.data, undefined, 2)}</code>
                </pre>
            </ScrollContainer>
            {typeof editor?.data?.templateID === "string" ? (
                <div>
                    <button
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(copyTemplates({ id: editor.data?.templateID }));
                        }}>
                        Copy
                    </button>
                    <button
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(removeTemplates({ id: editor.data?.templateID }));
                        }}>
                        Delete
                    </button>
                    <Link
                        to={Routes.Templates.View.replace(
                            RouteParams.TemplateId,
                            editor.data?.templateID,
                        )}>
                        Back
                    </Link>
                </div>
            ) : (
                <div></div>
            )}
        </Grid>
    );
}
