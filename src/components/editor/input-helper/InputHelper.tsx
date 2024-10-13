import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { IhCheckbox } from "./IhCheckbox";
import { IhColor } from "./IhColor";
import { IhDate } from "./IhDate";
import { IhDateTime } from "./IhDateTime";
import { IhNumber } from "./IhNumber";
import { IhStatic } from "./IhStatic";
import { IhTextLong } from "./IhTextLong";
import { IhTextShort } from "./IhTextShort";
import { IhTime } from "./IhTime";
import { useAppSelector } from "~/redux/hooks";
import { selectEditor } from "~/redux/features/editor/editor-slice";

const InputHelper = ({ cell }: { cell: EntryCell }) => {
    const editor = useAppSelector(selectEditor);
    const props: InputHelperProps = {
        cell,
        isReadOnly: editor.isPreview === true || editor.isTemplate === true,
    };

    switch (cell.template.inputHelper) {
        case 1:
            return <IhStatic {...props} />;
        case 2:
            return <IhTextShort {...props} />;
        case 3:
            return <IhTextLong {...props} />;
        case 4:
            return <IhNumber {...props} />;
        case 5:
            return <IhCheckbox {...props} />;
        case 6:
            return <IhDate {...props} />;
        case 7:
            return <IhTime {...props} />;
        case 8:
            return <IhDateTime {...props} />;
        case 9:
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
