import { useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import Editor from "~/components/editor/Editor";

export default function EntryView() {
    const { entryId, isNew } = useParams();

    return (
        <Editor
            id={entryId ?? DEFAULT_UUID}
            isTemplate={false}
            isPreview={true}
            isNew={isNew === "true"}
        />
    );
}
