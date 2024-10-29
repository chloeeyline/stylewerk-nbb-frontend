import { useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import Editor from "~/components/editor/Editor";
import ScrollContainer from "~/components/layout/ScrollContainer";
import UserGuard from "~/components/general/UserGuard";

const EntriesEdit = () => {
    const { entryId, isNew } = useParams();

    return (
        <ScrollContainer direction="both">
            <Editor
                id={entryId ?? DEFAULT_UUID}
                isTemplate={false}
                isPreview={false}
                isNew={isNew === "true"}
            />
        </ScrollContainer>
    );
};

export default function EntriesEditGuarded() {
    return (
        <UserGuard>
            <EntriesEdit />
        </UserGuard>
    );
}
