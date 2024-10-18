import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { IhCheckbox } from "./IhCheckbox";
import { IhColor } from "./IhColor";
import { IhDateTime } from "./IhDateTime";
import { IhNumber } from "./IhNumber";
import { IhStatic } from "./IhStatic";
import { IhText } from "./IhText";

const InputHelper = ({ cell }: { cell: EntryCell }) => {
    const editor = useAppSelector(selectEditor);
    const props: InputHelperProps = {
        cell,
        isReadOnly: editor.isPreview === true || editor.isTemplate === true,
    };

    switch (cell.template.inputHelper) {
        case 1:
            return <IhStatic {...props} />;
        case 3:
            return <IhText {...props} />;
        case 4:
            return <IhNumber {...props} />;
        case 5:
            return <IhCheckbox {...props} />;
        case 6:
            return <IhDateTime {...props} />;
        case 7:
            return <IhColor {...props} />;
        default:
            return (
                <pre>
                    <code>{JSON.stringify(cell.template, undefined, 2)}</code>
                </pre>
            );
    }
};

export default InputHelper;
