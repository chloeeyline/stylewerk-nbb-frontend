import { useParams } from "react-router-dom";
import Editor from "~/components/editor/Editor";
import { DEFAULT_UUID } from "~/constants/general";

export default function EntriesEdit() {
    const { entryId } = useParams();

    return <Editor id={entryId ?? DEFAULT_UUID} isTemplate={false} isPreview={false} />;
}
