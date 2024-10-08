import { useParams } from "react-router-dom";

import { useEffect } from "react";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { getEditor, selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function EntryView() {
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
        <ScrollContainer direction="both">
            <pre>
                <code>{JSON.stringify(editor.data, undefined, 2)}</code>
            </pre>
        </ScrollContainer>
    );
}
