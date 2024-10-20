import { useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import Editor from "~/components/editor/Editor";

export default function EntriesEdit() {
    const { entryId, isNew } = useParams();

    return (
        <Editor
            id={entryId ?? DEFAULT_UUID}
            isTemplate={false}
            isPreview={false}
            isNew={isNew === "true"}
        />
    );
}
