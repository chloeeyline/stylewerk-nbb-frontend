import { useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import Editor from "~/components/editor/Editor";
import ScrollContainer from "~/components/layout/ScrollContainer";
import UserGuard from "~/components/general/UserGuard";

const TemplatesEdit = () => {
    const { templateId, isNew } = useParams();

    return (
        <ScrollContainer direction="both">
            <Editor
                id={templateId ?? DEFAULT_UUID}
                isTemplate={true}
                isPreview={false}
                isNew={isNew === "true"}
            />
        </ScrollContainer>
    );
};

export default function TemplatesEditGuarded() {
    return (
        <UserGuard>
            <TemplatesEdit />
        </UserGuard>
    );
}
