import { useParams } from "react-router-dom";

import { useEffect } from "react";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { getEditor, reset, selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function TemplateView() {
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
        <ScrollContainer direction="both">
            <pre>
                <code>{JSON.stringify(editor.data, undefined, 2)}</code>
            </pre>
        </ScrollContainer>
    );
}
