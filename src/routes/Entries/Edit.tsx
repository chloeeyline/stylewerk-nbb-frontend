import { Link, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import { useEffect } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { getEditor, selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function EntriesEdit() {
    const { entryId } = useParams();
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!entryId) return;
        dispatch(getEditor({ id: entryId, isTemplate: false }));
    }, [entryId]);

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
        <Grid layout="header" className="size-block-100">
            <ScrollContainer direction="both">
                <pre>
                    <code>{JSON.stringify(editor.data, undefined, 2)}</code>
                </pre>
                {typeof editor.data?.templateID === "string" ? (
                    <>
                        <button
                            onClick={() => {
                                if (typeof editor.data?.templateID !== "string") return;
                                // dispatch(removeTemplates({ id: data.templateID }));
                            }}>
                            Delete
                        </button>
                        <Link
                            to={Routes.Entries.View.replace(
                                RouteParams.EntryId,
                                editor.data?.templateID,
                            )}>
                            Edit
                        </Link>
                    </>
                ) : null}
            </ScrollContainer>
        </Grid>
    );
}
