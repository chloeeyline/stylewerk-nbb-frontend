import { useParams } from "react-router-dom";
import Editor from "~/components/editor/Editor";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { DEFAULT_UUID } from "~/constants/general";

export default function TemplatesEdit() {
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
}
