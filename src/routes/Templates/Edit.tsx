import { useParams } from "react-router-dom";
import Editor from "~/components/editor/Editor";
import { DEFAULT_UUID } from "~/constants/general";

export default function TemplatesEdit() {
    const { templateId } = useParams();

    return <Editor id={templateId ?? DEFAULT_UUID} isTemplate={true} isPreview={false} />;
}
